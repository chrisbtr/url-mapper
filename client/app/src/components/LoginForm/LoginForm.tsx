import React from "react";
import {
  Stack,
  Typography,
  TextField,
  TextFieldProps,
  Button,
  Paper,
  PaperProps,
} from "@mui/material";

export type LoginFormProps = {
  usernameTextFieldProps?: TextFieldProps;
  passwordTextFieldProps?: TextFieldProps;
  paperFormProps?: PaperProps<"form">;
};

const LoginForm: React.FC<LoginFormProps> = ({
  usernameTextFieldProps,
  passwordTextFieldProps,
  paperFormProps,
}) => {
  return (
    <Paper
      component="form"
      autoComplete="off"
      sx={{ p: 2, px: 8, my: 2, width: "600px" }}
      name="login-form"
      {...paperFormProps}
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
          id="username-input"
          size="small"
          label="Username"
          InputLabelProps={{
            shrink: true,
          }}
          {...usernameTextFieldProps}
        />
        <TextField
          required
          fullWidth
          id="password-input"
          size="small"
          type="password"
          label="Password"
          InputLabelProps={{
            shrink: true,
          }}
          {...passwordTextFieldProps}
        />
        <Button size="small" type="submit">
          Login
        </Button>
      </Stack>
    </Paper>
  );
};

export default LoginForm;
