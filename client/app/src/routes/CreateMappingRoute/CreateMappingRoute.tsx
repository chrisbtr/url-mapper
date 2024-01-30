import React from "react";
import Box from "@mui/material/Box";
import { isAxiosError } from "axios";
import CreateMappingForm from "components/CreateMappingForm/CreateMappingForm";
import SnackbarAlert from "components/SnackbarAlert/SnackbarAlert";
import urlMappingsApi, {
  UrlMapping,
  UrlMappingPostError,
} from "api/urlMappings";

const CreateMappingRoute: React.FC = () => {
  const [url, setUrl] = React.useState("");
  const [urlKey, setUrlKey] = React.useState("");

  const [urlErrorMessages, setUrlErrorMessages] = React.useState<
    string[] | null
  >(null);
  const [urlKeyErrorMessages, setUrlKeyErrorMessages] = React.useState<
    string[] | null
  >(null);

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

  const handleUrlInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setUrl(event.target.value);
  };

  const handleUrlKeyInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setUrlKey(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log(event);
    const data: UrlMapping = { fullURL: url, urlKey: urlKey };
    console.log(data);

    urlMappingsApi
      .post(data)
      .then((res) => {
        console.log(res);

        setUrlErrorMessages(null);
        setUrlKeyErrorMessages(null);

        openSnackbar("Successfully created mapping.", { isError: false });
      })
      .catch((err) => {
        console.log(err);

        if (isAxiosError<UrlMappingPostError>(err)) {
          console.log("err");

          setUrlErrorMessages(err.response?.data?.fullURL ?? null);
          setUrlKeyErrorMessages(err.response?.data?.urlKey ?? null);

          openSnackbar("Error: Invalid inputs.", { isError: true });
        } else {
          console.log("Error is not Axios");

          openSnackbar("Unknown error.", { isError: true });
        }
      });
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
    // setAlertMessage("");
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CreateMappingForm
        paperFormProps={{ onSubmit: handleSubmit }}
        urlTextFieldProps={{
          onChange: handleUrlInputChange,
          value: url,
          error: urlErrorMessages === null ? false : true,
          helperText: (
            <>
              {urlErrorMessages?.map((errorMessage) => (
                <>{errorMessage}</>
              ))}
            </>
          ),
        }}
        urlKeyTextFieldProps={{
          onChange: handleUrlKeyInputChange,
          value: urlKey,
          error: urlKeyErrorMessages === null ? false : true,
          helperText: (
            <>
              {urlKeyErrorMessages?.map((errorMessage) => (
                <>{errorMessage}</>
              ))}
            </>
          ),
        }}
      />
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
