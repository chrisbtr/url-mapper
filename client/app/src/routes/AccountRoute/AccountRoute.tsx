import React from "react";
import { TextFieldProps } from "@mui/material";
import AccountInfoContainer from "components/AccountInfoContainer/AccountInfoContainer";
import { isAxiosError } from "axios";
import AccountLoginSwitcher from "components/AccountLoginSwitcher/AccountLoginSwitcher";
import SnackbarAlert from "components/SnackbarAlert/SnackbarAlert";
import accountApi, { CreateAccountError } from "api/account";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const AccountRoute: React.FC = () => {
  const [usernameInput, setUsernameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");

  const [usernameErrorMessages, setUsernameErrorMessages] = React.useState<
    string[] | null
  >(null);
  const [passwordErrorMessages, setPasswordErrorMessages] = React.useState<
    string[] | null
  >(null);

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

  const handleUsernameInputChange: TextFieldProps["onChange"] = (event) => {
    setUsernameInput(event.target.value);
  };

  const handlePasswordInputChange: TextFieldProps["onChange"] = (event) => {
    setPasswordInput(event.target.value);
  };

  const handleClearForm = () => {
    setUsernameInput("");
    setPasswordInput("");
  };

  const queryClient = useQueryClient();

  const { data: accountInfo, isSuccess } = useQuery({
    queryFn: async () => {
      return (await accountApi.getAccount()).data;
    },
    queryKey: ["account", "user"],
  });

  const handleCreateAccountSubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    console.log(event);

    accountApi
      .createAccount({
        username: usernameInput,
        password: passwordInput,
      })
      .then((res) => {
        console.log(res);

        setUsernameErrorMessages(null);
        setPasswordErrorMessages(null);

        openSnackbar("Successfully created account.", { isError: false });
      })
      .catch((err) => {
        if (isAxiosError<CreateAccountError>(err)) {
          setUsernameErrorMessages(err.response?.data?.username ?? null);
          setPasswordErrorMessages(err.response?.data?.password ?? null);

          openSnackbar("Error: Invalid inputs.", { isError: true });
        } else {
          openSnackbar("Unknown error.", { isError: true });
        }
      });
  };

  const handleLoginSubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();

    accountApi
      .login({ username: usernameInput, password: passwordInput })
      .then(() => {
        setUsernameErrorMessages(null);
        setPasswordErrorMessages(null);
        queryClient.invalidateQueries(["account", "user"]);

        openSnackbar("Successfully logged in.", { isError: false });
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          openSnackbar("Error: Invalid login info.", { isError: true });
        } else {
          openSnackbar("Unknown error.", { isError: true });
        }
      });
  };

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
          onCreateAccountSubmit={handleCreateAccountSubmit}
          onLoginSubmit={handleLoginSubmit}
          onClearForm={handleClearForm}
          createAccountFormProps={{
            usernameTextFieldProps: {
              value: usernameInput,
              onChange: handleUsernameInputChange,
              error: usernameErrorMessages === null ? false : true,
              helperText: (
                <>
                  {usernameErrorMessages?.map((errorMessage) => (
                    <>{errorMessage}</>
                  ))}
                </>
              ),
            },
            passwordTextFieldProps: {
              value: passwordInput,
              onChange: handlePasswordInputChange,
              error: passwordErrorMessages === null ? false : true,
              helperText: (
                <>
                  {passwordErrorMessages?.map((errorMessage) => (
                    <>{errorMessage}</>
                  ))}
                </>
              ),
            },
          }}
          loginFormProps={{
            usernameTextFieldProps: {
              value: usernameInput,
              onChange: handleUsernameInputChange,
              error: usernameErrorMessages === null ? false : true,
              helperText: (
                <>
                  {usernameErrorMessages?.map((errorMessage) => (
                    <>{errorMessage}</>
                  ))}
                </>
              ),
            },
            passwordTextFieldProps: {
              value: passwordInput,
              onChange: handlePasswordInputChange,
              error: passwordErrorMessages === null ? false : true,
              helperText: (
                <>
                  {passwordErrorMessages?.map((errorMessage) => (
                    <>{errorMessage}</>
                  ))}
                </>
              ),
            },
          }}
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
