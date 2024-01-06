import React from "react";
import Paper, { PaperProps } from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

import { UrlMapping } from "../../api/urlMappings";

export type URLMappingProps = {
  urlMapping: UrlMapping,
  paperProps?: PaperProps,
}

const URLMapping: React.FC<URLMappingProps> = ({urlMapping, paperProps}) => {
  return (
    <Paper {...paperProps} sx={{textAlign: 'center', p: 2, mx: 24}} >
      <Typography variant="h6">
        <Link to={`/m/${urlMapping.urlKey}`} >
          {urlMapping.urlKey}
        </Link>
      </Typography>
      <Typography variant="subtitle2">Maps to:</Typography>
      <Typography sx={{fontWeight: 700}}>
        <Link to={urlMapping.fullURL} >
          {urlMapping.fullURL}
        </Link>
      </Typography>
    </Paper>
  );
};

export default URLMapping;