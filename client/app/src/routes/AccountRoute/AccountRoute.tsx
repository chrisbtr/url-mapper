import React from "react";
import AccountInfoContainer from "components/AccountInfoContainer/AccountInfoContainer";
import AccountLoginSwitcher from "components/AccountLoginSwitcher/AccountLoginSwitcher";
import SnackbarAlert from "components/SnackbarAlert/SnackbarAlert";
import accountApi from "api/account";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const AccountRoute: React.FC = () => {
  const [alertMessage, setAlertMessage] = React.useState("");
  const [isAlertErrorMessage, setIsAlertErrorMessage] = React.useState(false);

  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);

  const openSnackbar = (
    message: string,
    options: { isError?: boolean } = {}
  ) => {
    setAlertMessage(message);
    setIsAlertErrorMessage(options.isError ?? false);
    setIsSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const queryClient = useQueryClient();

  const { data: accountInfo, isSuccess } = useQuery({
    queryFn: async () => {
      return (await accountApi.getAccount()).data;
    },
    queryKey: ["account", "user"],
  });

  const handleLogout = () => {
    accountApi
      .logout()
      .then(() => {
        queryClient.invalidateQueries(["account", "user"]);
        openSnackbar("Successfully logged out.", { isError: false });
      })
      .catch(() => {
        openSnackbar("Error: Could not logout.", { isError: true });
      });
  };

  return (
    <>
      {!isSuccess ? (
        <AccountLoginSwitcher
          createAccountFormProps={{ openSnackbar }}
          loginFormProps={{ openSnackbar }}
        />
      ) : (
        <AccountInfoContainer
          accountInfo={accountInfo}
          onLogout={handleLogout}
        />
      )}
      <SnackbarAlert
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        error={isAlertErrorMessage}
        alertMessage={alertMessage}
      />
    </>
  );
};

export default AccountRoute;
