import React from "react";
import Button from "@mui/material/Button";
import Paper, { PaperProps } from "@mui/material/Paper";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export interface CreateMappingFormProps {
  urlTextFieldProps?: TextFieldProps;
  urlKeyTextFieldProps?: TextFieldProps;
  paperFormProps?: PaperProps<"form">;
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
  urlTextFieldProps,
  urlKeyTextFieldProps,
  paperFormProps,
}) => {
  return (
    <Paper
      component="form"
      autoComplete="off"
      sx={{ p: 2, my: 1, width: "600px" }}
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
        Create A URL Mapping
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
        Enter your URL and a key to create a shortened version
      </Typography>
      <Box sx={{ mb: 2, mx: 8 }}>
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
          {...urlKeyTextFieldProps}
        />
      </Box>
      <Box sx={{ mb: 2, mx: 8 }}>
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
          {...urlTextFieldProps}
        />
      </Box>
      <Button size="small" type="submit" sx={{ mb: 1 }}>
        Create Mapping
      </Button>
      <Divider sx={{ mb: 1 }} />
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        Your URL Mapping:
      </Typography>
      <Typography
        variant="subtitle1"
        color="secondary"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box
          data-testid={`url-key${urlKeyTextFieldProps?.error ? "-error" : ""}`}
          color={
            urlKeyTextFieldProps?.error
              ? (theme) => theme.palette.error.main
              : ""
          }
        >
          {window.location.origin}/m/{String(urlKeyTextFieldProps?.value)}
        </Box>
        <ArrowForwardIcon />
        <Box
          data-testid={`full-url${urlTextFieldProps?.error ? "-error" : ""}`}
          color={
            urlTextFieldProps?.error ? (theme) => theme.palette.error.main : ""
          }
        >
          {String(urlTextFieldProps?.value)}
        </Box>
      </Typography>
    </Paper>
  );
};

export default CreateMappingForm;
