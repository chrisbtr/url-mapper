import React from "react";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import LoginForm, { LoginFormProps } from "components/LoginForm/LoginForm";
import { PaperProps } from "@mui/material/Paper";
import CreateAccountForm, {
  CreateAccountFormProps,
} from "components/CreateAccountForm/CreateAccountForm";

export type AccountLoginSwitcherProps = {
  onLoginSubmit?: PaperProps<"form">["onSubmit"];
  onCreateAccountSubmit?: PaperProps<"form">["onSubmit"];
  onClearForm?: () => void;
  loginFormProps?: LoginFormProps;
  createAccountFormProps?: CreateAccountFormProps;
};

const AccountLoginSwitcher: React.FC<AccountLoginSwitcherProps> = ({
  onLoginSubmit,
  onCreateAccountSubmit,
  onClearForm,
  loginFormProps,
  createAccountFormProps,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleChange: TabsProps["onChange"] = (event, newValue) => {
    setCurrentIndex(newValue);
    onClearForm?.();
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={currentIndex} onChange={handleChange}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
      </Box>
      {currentIndex === 0 ? (
        <LoginForm
          paperFormProps={{ onSubmit: onLoginSubmit }}
          {...loginFormProps}
        />
      ) : (
        <CreateAccountForm
          paperFormProps={{ onSubmit: onCreateAccountSubmit }}
          {...createAccountFormProps}
        />
      )}
    </Box>
  );
};

export default AccountLoginSwitcher;
