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
      name="register-form"
      sx={{ p: 2, px: 8, my: 2, maxWidth: "600px" }}
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
          Create Your Account
        </Typography>
        <Typography variant="body1" textAlign="center">
          Create an account to keep track of your URL mappings
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
        <Button size="small" type="submit" sx={{ mb: 1 }}>
          Create Account
        </Button>
      </Stack>
    </Paper>
  );
};

export default CreateAccountForm;
