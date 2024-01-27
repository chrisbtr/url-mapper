import React from "react";
import Button from "@mui/material/Button";
import Paper, { PaperProps } from "@mui/material/Paper";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Box from "@mui/material/Box";

export type CreateAccountFormProps = {
  usernameTextFieldProps?: TextFieldProps;
  passwordTextFieldProps?: TextFieldProps;
  paperFormProps?: PaperProps<"form">;
};

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  usernameTextFieldProps,
  passwordTextFieldProps,
  paperFormProps,
}) => {
  return (
    <Paper
      component="form"
      autoComplete="off"
      sx={{ p: 2, my: 1 }}
      {...paperFormProps}
    >
      <Box justifyContent="center">
        <TextField
          required
          sx={{ width: "25%", mb: 2 }}
          id="username-input"
          size="small"
          label="Username"
          InputLabelProps={{
            shrink: true,
          }}
          {...usernameTextFieldProps}
        />
      </Box>
      <Box justifyContent="center">
        <TextField
          required
          sx={{ width: "25%", mb: 2 }}
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
        Create Account
      </Button>
    </Paper>
  );
};

export default CreateAccountForm;
