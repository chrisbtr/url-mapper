import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import urlMappingsApi, { UrlMapping, UrlMappingGetAllParams } from '../../api/urlMappings';
import URLMapping from '../../components/URLMapping/URLMapping';

const AllMappingsRoute: React.FC = () => {
  const [mappedUrls, setMappedUrls] = React.useState<UrlMapping[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const isSearchQueryEmpty = () => searchQuery === "";

  const getFilteredMappings = (params: UrlMappingGetAllParams = {}) => {
    urlMappingsApi.getAll(params).then(res => {
      setMappedUrls([...res.data]);
    }).catch(err => {
      console.log(err);
    });
  }

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClear = () => {
    setSearchQuery("");
    // urlMappingsApi.getAll().then(res => {
    //   setMappedUrls([...res.data]);
    // }).catch(err => {
    //   console.log(err);
    // });
    getFilteredMappings();
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    const normalizedSearchQuery = searchQuery.trim();
    if (event.key !== "Enter" || (normalizedSearchQuery === "" && searchQuery !== "")) {
      return;
    }

    console.log(`Searching for "${normalizedSearchQuery}"...`)
    // urlMappingsApi.getAll({search: normalizedSearchQuery}).then(res => {
    //   setMappedUrls([...res.data]);
    // }).catch(err => {
    //   console.log(err);
    // });
    getFilteredMappings({search: normalizedSearchQuery})
  }

  React.useEffect(() => {
    urlMappingsApi.getAll().then(res => {
      setMappedUrls([...res.data]);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <>
      <Typography
        variant="h3"
        noWrap
        sx={{
          mt: 2,
          fontWeight: 500,
          textAlign: 'center'
        }}
      >
        All Mappings
      </Typography>

      <Box sx={{m: 2, mx: 24}}>
      <TextField 
        fullWidth={true}
        size="small"
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
        value={searchQuery}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: !isSearchQueryEmpty() ? (
            <IconButton onClick={handleSearchClear}>
              <InputAdornment position='end'>
                <ClearIcon />
              </InputAdornment>
            </IconButton>
          ) : null
        }}
      />
      </Box>
      <Divider orientation='horizontal' />
      <Grid>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            display: 'grid',
            gridTemplateColumns: { md: '1fr' },
            gap: 2,
          }}
        >
          {mappedUrls.map((mappedUrl, index) => <URLMapping key={`url-mapping-${index}`} urlMapping={mappedUrl}/>)}
        </Box>
      </Grid>
    </>
  );
};

export default AllMappingsRoute;