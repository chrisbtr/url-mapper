import React from "react";
import { Stack, Typography, TextField, Button, Paper } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import accountApi from "api/account";
import { isAxiosError } from "axios";

export type LoginFormProps = {
  openSnackbar: (
    message: string,
    options?: {
      isError?: boolean;
    }
  ) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ openSnackbar }) => {
  const [usernameInput, setUsernameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");

  const queryClient = useQueryClient();

  const { mutate: login, isLoading: loginIsLoading } = useMutation({
    mutationFn: () =>
      accountApi.login({ username: usernameInput, password: passwordInput }),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["account", "user"]);
    },
    onError: (err) => {
      setPasswordInput("");
      if (isAxiosError(err) && err.response?.status === 400) {
        openSnackbar("Error: Invalid information.", { isError: true });
      } else {
        openSnackbar("Unknown error.", { isError: true });
      }
    },
  });

  const handleUsernameInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = React.useCallback((event) => {
    setUsernameInput(event.target.value);
  }, []);

  const handlePasswordInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = React.useCallback((event) => {
    setPasswordInput(event.target.value);
  }, []);

  return (
    <Paper
      component="form"
      autoComplete="off"
      sx={{ p: 2, px: 8, my: 2, maxWidth: "600px" }}
      name="login-form"
      onSubmit={(event) => {
        event.preventDefault();
        login();
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
          Login
        </Typography>
        <Typography variant="body1" textAlign="center">
          Login to access your previously created URL mappings
        </Typography>
        <TextField
          required
          fullWidth
          size="small"
          label="Username"
          value={usernameInput}
          onChange={handleUsernameInputChange}
        />
        <TextField
          required
          fullWidth
          size="small"
          type="password"
          label="Password"
          value={passwordInput}
          onChange={handlePasswordInputChange}
        />
        <Button disabled={loginIsLoading} size="small" type="submit">
          Login
        </Button>
      </Stack>
    </Paper>
  );
};

export default LoginForm;
