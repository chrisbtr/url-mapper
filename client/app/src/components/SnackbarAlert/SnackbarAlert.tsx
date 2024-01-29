import React from "react";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import Alert, { AlertProps } from "@mui/material/Alert";

export type SnackbarAlertProps = {
  open?: boolean;
  error?: boolean;
  onClose?: () => void;
  autoHideDuration?: number | null;
  alertMessage?: string;
  snackbarProps?: SnackbarProps;
  alertProps?: AlertProps;
};

/**
 * A pop up alert.
 *
 * @param props.open If true, the component is shown.
 * @param props.error If true, the alert severity is set to 'error' else it is 'success'.
 * @param props.onClose Callback fired when the component requests to be closed.
 * @param props.autoHideDuration The number of milliseconds to wait before automatically calling the onClose function. This behavior is disabled by default with the null value.
 * @param props.alertMessage The message displayed in the alert.
 *
 */
const SnackbarAlert: React.FC<SnackbarAlertProps> = ({
  open,
  error = false,
  onClose,
  autoHideDuration = 5000,
  alertMessage = "",
  snackbarProps,
  alertProps,
} = {}) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      {...snackbarProps}
    >
      <Alert
        onClose={onClose}
        severity={error ? "error" : "success"}
        variant="filled"
        sx={{ width: "100%" }}
        {...alertProps}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
