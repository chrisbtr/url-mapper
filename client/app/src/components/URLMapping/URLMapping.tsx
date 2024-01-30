import React from "react";
import Paper, { PaperProps } from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { UrlMapping } from "api/urlMappings";

export type URLMappingProps = {
  urlMapping: UrlMapping;
  paperProps?: PaperProps;
};

/**
 * A card that displays a URL mapping.
 *
 * @param props.urlMapping An object with the full URL and shortened URL key.
 * @param props.paperProps MUI Paper Props.
 */
const URLMapping: React.FC<URLMappingProps> = ({ urlMapping, paperProps }) => {
  return (
    <Paper
      elevation={7}
      sx={{
        p: 2,
        mx: 24,
      }}
      {...paperProps}
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography
            component={Link}
            to={`/m/${urlMapping.urlKey}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="h6"
          >
            {urlMapping.urlKey}
          </Typography>
          <Typography variant="subtitle2">Maps to:</Typography>
          <Typography
            component={Link}
            target="_blank"
            rel="noopener noreferrer"
            to={urlMapping.fullURL}
            sx={{ fontWeight: 700 }}
          >
            {urlMapping.fullURL}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <OpenInNewIcon />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default URLMapping;
