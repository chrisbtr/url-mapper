import React from "react";
import { TextFieldProps } from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { isAxiosError } from "axios";
import CreateAccountForm from "../../components/CreateAccountForm/CreateAccountForm";
import SnackbarAlert from "../../components/SnackbarAlert/SnackbarAlert";
import accountApi, { CreateAccountError } from "../../api/account";

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
    setAlertMessage("");
  };

  const handleUsernameInputChange: TextFieldProps["onChange"] = (event) => {
    setUsernameInput(event.target.value);
  };

  const handlePasswordInputChange: TextFieldProps["onChange"] = (event) => {
    setPasswordInput(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
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

        openSnackbar("Successfully created mapping.", { isError: false });
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

  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CreateAccountForm
        paperFormProps={{ onSubmit: handleSubmit }}
        usernameTextFieldProps={{
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
        }}
        passwordTextFieldProps={{
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
        }}
      />
      <SnackbarAlert
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        error={isAlertErrorMessage}
        alertMessage={alertMessage}
      />
    </Box>
  );
};

export default AccountRoute;
