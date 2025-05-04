import React from "react";
import {
  Typography,
  Divider,
  TextField,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useMutation } from "@tanstack/react-query";
import urlMappingsApi, {
  UrlMapping,
  UrlMappingPostError,
} from "api/urlMappings";
import { isAxiosError } from "axios";

export interface CreateMappingFormProps {
  openSnackbar: (
    message: string,
    options?: {
      isError?: boolean;
    }
  ) => void;
}

/**
 * A form used for creating new URL mappings.
 *
 * @param props.urlTextFieldProps The URL that the shortened URL will map to.
 * @param props.urlKeyTextFieldProps The key used in the shortened URL.
 * @param props.paperFormProps MUI paper props.
 *
 */
const CreateMappingForm: React.FC<CreateMappingFormProps> = ({
  openSnackbar,
}) => {
  const [url, setUrl] = React.useState("");
  const [urlKey, setUrlKey] = React.useState("");

  const [urlErrorMessages, setUrlErrorMessages] = React.useState<
    string[] | null
  >(null);
  const [urlKeyErrorMessages, setUrlKeyErrorMessages] = React.useState<
    string[] | null
  >(null);

  const urlKeyIsError = urlKeyErrorMessages === null ? false : true;
  const urlIsError = urlErrorMessages === null ? false : true;

  const { mutate: createMapping, isLoading: createMappingIsLoading } =
    useMutation({
      mutationFn: (data: UrlMapping) => urlMappingsApi.post(data),
      onSuccess: () => {
        setUrl("");
        setUrlKey("");

        setUrlErrorMessages(null);
        setUrlKeyErrorMessages(null);

        openSnackbar("Successfully created mapping.", { isError: false });
      },
      onError: (err) => {
        if (isAxiosError<UrlMappingPostError>(err)) {
          setUrlErrorMessages(err.response?.data?.fullURL ?? null);
          setUrlKeyErrorMessages(err.response?.data?.urlKey ?? null);

          openSnackbar("Error: Invalid inputs.", { isError: true });
        } else {
          openSnackbar("Unknown error.", { isError: true });
        }
      },
    });

  const handleUrlInputChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((event) => {
      setUrlErrorMessages(null);
      setUrl(event.target.value);
    }, []);

  const handleUrlKeyInputChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((event) => {
      setUrlKeyErrorMessages(null);
      setUrlKey(event.target.value);
    }, []);

  return (
    <Paper
      component="form"
      autoComplete="off"
      sx={{ p: 2, px: 8, my: 2, maxWidth: "600px" }}
      onSubmit={(event) => {
        event.preventDefault();
        createMapping({ fullURL: url, urlKey });
      }}
    >
      <Stack gap={2}>
        <Typography
          component="h1"
          variant="h5"
          noWrap
          fontWeight={500}
          textAlign="center"
        >
          Create A URL Mapping
        </Typography>
        <Typography variant="body1">
          Enter your URL and a key to create a shortened version
        </Typography>
        <TextField
          required
          fullWidth
          id="url-key-input"
          size="small"
          placeholder="example"
          label="Key"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleUrlKeyInputChange}
          value={urlKey}
          error={urlKeyErrorMessages === null ? false : true}
          helperText={
            <>
              {urlKeyErrorMessages?.map((errorMessage) => (
                <>{errorMessage}</>
              ))}
            </>
          }
        />
        <TextField
          required
          fullWidth
          id="full-url-input"
          size="small"
          placeholder="https://example.com"
          type="url"
          label="Website URL"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleUrlInputChange}
          value={url}
          error={urlErrorMessages === null ? false : true}
          helperText={
            <>
              {urlErrorMessages?.map((errorMessage) => (
                <>{errorMessage}</>
              ))}
            </>
          }
        />
        <Button disabled={createMappingIsLoading} size="small" type="submit">
          Create Mapping
        </Button>

        <Divider />
        <Typography variant="subtitle2">Your URL Mapping:</Typography>
        <Stack
          direction="row"
          justifyContent="center"
          flexWrap="wrap"
          gap={1}
          overflow="auto"
        >
          <Typography
            component="div"
            data-testid={`url-key${urlKeyIsError ? "-error" : ""}`}
            color={urlKeyIsError ? "error" : undefined}
          >
            {`${window.location.origin}/m/${urlKey}`}
          </Typography>
          <ArrowForwardIcon />
          <Typography
            data-testid={`full-url${urlIsError ? "-error" : ""}`}
            color={urlIsError ? "error" : undefined}
          >
            {url}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CreateMappingForm;
