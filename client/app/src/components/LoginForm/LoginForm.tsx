import React from "react";
import Button from "@mui/material/Button";
import Paper, { PaperProps } from "@mui/material/Paper";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
      sx={{ p: 2, my: 1, width: "600px" }}
      name="login-form"
      {...paperFormProps}
    >
      <Typography
        variant="h5"
        noWrap
        sx={{
          my: 1,
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        Login
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
        Login to access your previously created URL mappings
      </Typography>
      <Box sx={{ mb: 2, mx: 8 }}>
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
      </Box>
      <Box sx={{ mb: 2, mx: 8 }}>
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
      </Box>
      <Button size="small" type="submit" sx={{ mb: 1 }}>
        Login
      </Button>
    </Paper>
  );
};

export default LoginForm;
