import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Pagination, { PaginationProps } from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
// import { useSearchParams } from 'react-router-dom';
import urlMappingsApi, { UrlMapping, UrlMappingGetAllParams } from '../../api/urlMappings';
import URLMapping from '../../components/URLMapping/URLMapping';

const AllMappingsRoute: React.FC = () => {
  const [mappedUrls, setMappedUrls] = React.useState<UrlMapping[]>([]);
  const [mappedUrlCount, setMappedUrlCount] = React.useState(0);
  
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentSearchQuery, setCurrentSearchQuery] = React.useState("");

  const [pageCount, setPageCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);

  // const [ searchParams, setSearchParams ] = useSearchParams();

  const isSearchQueryEmpty = () => searchQuery === "";

  const getFilteredMappings = (params: UrlMappingGetAllParams = {}) => {
    return urlMappingsApi.getAll({...params, page_size: pageSize}).then(res => {
      setMappedUrls([...res.data.results]);
      setCurrentSearchQuery(params.search ?? currentSearchQuery);
      setCurrentPage(params.page ?? currentPage);

      setMappedUrlCount(res.data.count);

      // searchParams.set("search", params.search ?? currentSearchQuery);
      // setSearchParams(searchParams)
    }).catch(err => {
      console.log(err);
    });
  }

  const handlePaginationChange: PaginationProps['onChange'] = (_, page) => {
    getFilteredMappings({search: currentSearchQuery, page})
  } 

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClear = () => {
    setSearchQuery("");
    getFilteredMappings();
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    const normalizedSearchQuery = searchQuery.trim();
    if (event.key !== "Enter" || (normalizedSearchQuery === "" && searchQuery !== "")) {
      return;
    }

    console.log(`Searching for "${normalizedSearchQuery}"...`)
    getFilteredMappings({search: normalizedSearchQuery})
  }

  React.useEffect(() => {
    getFilteredMappings();
  }, []);


  React.useEffect(() => {
    setPageCount(Math.ceil(mappedUrlCount/pageSize));
  }, [mappedUrlCount, pageSize]);

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
        fullWidth
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
      <Divider orientation='horizontal' />
      <Pagination sx={{justifyContent: 'center', display: 'flex', my: 1 }} count={pageCount} onChange={handlePaginationChange} />
    </>
  );
};

export default AllMappingsRoute;