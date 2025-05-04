import React from "react";
import LoginForm, { LoginFormProps } from "components/LoginForm/LoginForm";
import CreateAccountForm, {
  CreateAccountFormProps,
} from "components/CreateAccountForm/CreateAccountForm";
import { Stack, Tab, Tabs } from "@mui/material";

export type AccountLoginSwitcherProps = {
  loginFormProps: LoginFormProps;
  createAccountFormProps: CreateAccountFormProps;
};

const AccountLoginSwitcher: React.FC<AccountLoginSwitcherProps> = ({
  loginFormProps,
  createAccountFormProps,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleChange = React.useCallback(
    (_event: unknown, newValue: number) => {
      setCurrentIndex(newValue);
    },
    []
  );

  return (
    <Stack alignItems="center">
      <Tabs value={currentIndex} onChange={handleChange}>
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>
      {currentIndex === 0 ? (
        <LoginForm {...loginFormProps} />
      ) : (
        <CreateAccountForm {...createAccountFormProps} />
      )}
    </Stack>
  );
};

export default AccountLoginSwitcher;
