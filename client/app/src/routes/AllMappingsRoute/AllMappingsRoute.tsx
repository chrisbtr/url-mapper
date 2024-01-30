import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Pagination, { PaginationProps } from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useSearchParams } from "react-router-dom";
import urlMappingsApi, {
  UrlMapping,
  UrlMappingGetAllParams,
} from "api/urlMappings";
import URLMapping from "components/URLMapping/URLMapping";

const AllMappingsRoute: React.FC = () => {
  // React router wrapper for reading and writing search parameters
  const [searchParams, setSearchParams] = useSearchParams();

  // The list of mapped URLs to display
  const [mappedUrls, setMappedUrls] = React.useState<UrlMapping[]>([]);

  // The pagination page size
  const [pageSize, setPageSize] = React.useState(5);

  // The total amount of mapped URLs
  const [mappedUrlCount, setMappedUrlCount] = React.useState(0);

  // The search query used to populate the search bar with (defaults to the value in search parameters)
  const [searchQuery, setSearchQuery] = React.useState(
    searchParams.get("search") ?? ""
  );

  // The search query used to filter the current api request (defaults to the value in search parameters)
  const [currentSearchQuery, setCurrentSearchQuery] = React.useState(
    searchParams.get("search") ?? ""
  );

  // The total amount of pagination pages for the URL mappings
  const [pageCount, setPageCount] = React.useState(1);

  // The current pagination page of the URL mappings
  const [currentPage, setCurrentPage] = React.useState(
    isNaN(Number.parseInt(searchParams.get("page") ?? "1"))
      ? 1
      : Number.parseInt(searchParams.get("page") ?? "1")
  );

  // Helper function to check if the search bar is empty
  const isSearchQueryEmpty = () => searchQuery === "";

  // Helper function to get the URL mappings
  const getFilteredMappings = (params: UrlMappingGetAllParams = {}) => {
    return urlMappingsApi
      .getAll({ ...params, page_size: pageSize })
      .then((res) => {
        // Update component state based on the function arguments
        setMappedUrls([...res.data.results]);
        setCurrentSearchQuery(params.search ?? currentSearchQuery);
        setCurrentPage(params.page ?? currentPage);
        setMappedUrlCount(res.data.count);

        // Update the search parameters to reflect the change in state
        searchParams.set("page", String(params.page ?? currentPage));
        searchParams.set("search", params.search ?? currentSearchQuery);

        setSearchParams(searchParams);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handler for changing pages
  const handlePaginationChange: PaginationProps["onChange"] = (_, page) => {
    getFilteredMappings({ search: currentSearchQuery, page });
  };

  // Handler for search bar input change
  const handleSearchChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handler for when the search bar's clear button is clicked
  const handleSearchClear = () => {
    setSearchQuery("");
    getFilteredMappings({ search: "" });
  };

  // Handler for when the `Enter` key is clicked while in the search bar
  const handleKeyPress: React.KeyboardEventHandler<HTMLDivElement> = (
    event
  ) => {
    // Removes the leading and trailing white space from the input
    const normalizedSearchQuery = searchQuery.trim();

    // return if the `Enter` key was not pressed or the input only contains white space
    if (
      event.key !== "Enter" ||
      (normalizedSearchQuery === "" && searchQuery !== "")
    ) {
      return;
    }

    // Fetch the URL mappings using the `normalizedSearchQuery` filter
    console.log(`Searching for "${normalizedSearchQuery}"...`);
    getFilteredMappings({ search: normalizedSearchQuery });
  };

  // On component mount fetch the URL mappings
  React.useEffect(() => {
    getFilteredMappings({ page: currentPage, search: currentSearchQuery });
  }, []);

  // If the `mappedUrlCount` or `pageSize` change recalculate `pageCount`
  React.useEffect(() => {
    setPageCount(Math.ceil(mappedUrlCount / pageSize));
  }, [mappedUrlCount, pageSize]);

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
        All Mappings
      </Typography>

      <Box sx={{ m: 2, mx: 24 }}>
        <TextField
          fullWidth
          size="small"
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          value={searchQuery}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: !isSearchQueryEmpty() ? (
              <IconButton onClick={handleSearchClear}>
                <InputAdornment position="end">
                  <ClearIcon />
                </InputAdornment>
              </IconButton>
            ) : null,
          }}
        />
      </Box>
      <Divider orientation="horizontal" />
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          display: "grid",
          gridTemplateColumns: { md: "1fr" },
          gap: 2,
        }}
      >
        {mappedUrls.map((mappedUrl, index) => (
          <URLMapping key={`url-mapping-${index}`} urlMapping={mappedUrl} />
        ))}
      </Box>
      <Divider orientation="horizontal" />
      <Pagination
        sx={{ justifyContent: "center", display: "flex", my: 1 }}
        count={pageCount}
        onChange={handlePaginationChange}
      />
    </>
  );
};

export default AllMappingsRoute;
