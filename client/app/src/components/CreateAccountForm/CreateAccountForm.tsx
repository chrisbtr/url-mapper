import React from "react";
import { Stack, Typography, TextField, Button, Paper } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import accountApi, { CreateAccountError } from "api/account";
import { isAxiosError } from "axios";

export type CreateAccountFormProps = {
  openSnackbar: (
    message: string,
    options?: {
      isError?: boolean;
    }
  ) => void;
};

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  openSnackbar,
}) => {
  const [usernameInput, setUsernameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");

  const [usernameErrorMessages, setUsernameErrorMessages] = React.useState<
    string[] | null
  >(null);
  const [passwordErrorMessages, setPasswordErrorMessages] = React.useState<
    string[] | null
  >(null);

  const { mutate: register, isLoading: registerIsLoading } = useMutation({
    mutationFn: () =>
      accountApi.createAccount({
        username: usernameInput,
        password: passwordInput,
      }),
    onSuccess: () => {
      setUsernameInput("");
      setPasswordInput("");

      setUsernameErrorMessages(null);
      setPasswordErrorMessages(null);

      openSnackbar("Successfully created account.", { isError: false });
    },
    onError: (err) => {
      if (isAxiosError<CreateAccountError>(err)) {
        setUsernameErrorMessages(err.response?.data?.username ?? null);
        setPasswordErrorMessages(err.response?.data?.password ?? null);

        openSnackbar("Error: Invalid inputs.", { isError: true });
      } else {
        openSnackbar("Unknown error.", { isError: true });
      }
    },
  });

  const handleUsernameInputChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  >((event) => {
    setUsernameErrorMessages(null);
    setUsernameInput(event.target.value);
  }, []);

  const handlePasswordInputChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  >((event) => {
    setPasswordErrorMessages(null);
    setPasswordInput(event.target.value);
  }, []);

  return (
    <Paper
      component="form"
      autoComplete="off"
      name="register-form"
      sx={{ p: 2, px: 8, my: 2, maxWidth: "600px" }}
      onSubmit={(event) => {
        event.preventDefault();
        register();
      }}
    >
      <Stack justifyContent="center" gap={2}>
        <Typography
          component="h1"
          variant="h5"
          noWrap
          fontWeight={500}
          textAlign="center"
        >
          Create Your Account
        </Typography>
        <Typography variant="body1" textAlign="center">
          Create an account to keep track of your URL mappings
        </Typography>
        <TextField
          required
          fullWidth
          size="small"
          label="Username"
          value={usernameInput}
          onChange={handleUsernameInputChange}
          error={usernameErrorMessages === null ? false : true}
          helperText={
            <>
              {usernameErrorMessages?.map((errorMessage) => (
                <>{errorMessage}</>
              ))}
            </>
          }
        />
        <TextField
          required
          fullWidth
          size="small"
          type="password"
          label="Password"
          value={passwordInput}
          onChange={handlePasswordInputChange}
          error={passwordErrorMessages === null ? false : true}
          helperText={
            <>
              {passwordErrorMessages?.map((errorMessage) => (
                <>{errorMessage}</>
              ))}
            </>
          }
        />
        <Button disabled={registerIsLoading} size="small" type="submit">
          Create Account
        </Button>
      </Stack>
    </Paper>
  );
};

export default CreateAccountForm;
