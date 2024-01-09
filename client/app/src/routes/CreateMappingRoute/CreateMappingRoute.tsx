import React from "react";
import Box from "@mui/material/Box";
import CreateMappingForm from "../../components/CreateMappingForm/CreateMappingForm";
import urlMappingsApi, { UrlMapping } from "../../api/urlMappings";
import Typography from "@mui/material/Typography";

const CreateMappingRoute: React.FC = () => {
  const [url, setUrl] = React.useState("");
  const [urlKey, setUrlKey] = React.useState("");

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Typography
        variant="h3"
        noWrap
        sx={{
          mt: 2,
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        Create Mapping
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <CreateMappingForm
          paperFormProps={{ onSubmit: handleSubmit }}
          urlTextFieldProps={{ onChange: handleUrlInputChange, value: url }}
          urlKeyTextFieldProps={{
            onChange: handleUrlKeyInputChange,
            value: urlKey,
          }}
        />
      </Box>
    </>
  );
};

export default CreateMappingRoute;
