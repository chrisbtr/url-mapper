import React from "react";
import Box from "@mui/material/Box";
import CreateMappingForm from "components/CreateMappingForm/CreateMappingForm";
import SnackbarAlert from "components/SnackbarAlert/SnackbarAlert";

const CreateMappingRoute: React.FC = () => {
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
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CreateMappingForm openSnackbar={openSnackbar} />
      <SnackbarAlert
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        error={isAlertErrorMessage}
        alertMessage={alertMessage}
      />
    </Box>
  );
};

export default CreateMappingRoute;
