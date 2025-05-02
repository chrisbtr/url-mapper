import React from "react";
import { useParams } from "react-router-dom";
import urlMappingsApi from "api/urlMappings";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";

type RedirectRouteParams = {
  urlKey: string;
};

const RedirectRoute: React.FC = () => {
  const { urlKey } = useParams<RedirectRouteParams>();

  // Fetch the full URL using `urlKey` route parameter.
  const {
    data: mapping,
    isLoading: mappingIsLoading,
    isError: mappingIsError,
  } = useQuery({
    queryFn: async () => (await urlMappingsApi.get(urlKey as string)).data,

    enabled: urlKey != null,
  });

  React.useEffect(() => {
    if (mappingIsLoading || mappingIsError) {
      return;
    }

    if (mapping.fullURL !== urlKey) {
      window.location.replace(mapping.fullURL);
    }
  }, [mapping, mappingIsLoading, mappingIsError, urlKey]);

  return (
    <Box textAlign="center">
      {mappingIsLoading && "Redirect..."}
      {mappingIsError && "There was an error. Unable to redirect."}
    </Box>
  );
};

export default RedirectRoute;
