import React from "react";
import { Link } from "react-router-dom";
import { UrlMapping } from "api/urlMappings";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
} from "@mui/material";

export type URLMappingProps = {
  urlMapping: UrlMapping;
};

/**
 * A card that displays a URL mapping.
 *
 * @param props.urlMapping An object with the full URL and shortened URL key.
 * @param props.paperProps MUI Paper Props.
 */
const URLMapping: React.FC<URLMappingProps> = ({ urlMapping }) => {
  return (
    <Box width={700}>
      <Card>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component={Link}
            to={`/m/${urlMapping.urlKey}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {urlMapping.urlKey}
          </Typography>
          <Stack gap={1}>
            <Typography variant="subtitle2">Maps to: </Typography>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to={urlMapping.fullURL}
            >
              {urlMapping.fullURL}
            </Link>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default URLMapping;
