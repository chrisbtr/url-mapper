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
import urlMappingsApi from "api/urlMappings";
import URLMapping from "components/URLMapping/URLMapping";
import { useQuery } from "@tanstack/react-query";

const pageSize = 5;

const AllMappingsRoute: React.FC = () => {
  // React router wrapper for reading and writing search parameters
  const [searchParams, setSearchParams] = useSearchParams();

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

  React.useEffect(() => {
    searchParams.set("page", String(currentPage));
    searchParams.set("search", currentSearchQuery);
    setSearchParams(searchParams);
  }, [currentPage, currentSearchQuery, searchParams, setSearchParams]);

  // Handler for changing pages
  const handlePaginationChange: PaginationProps["onChange"] = (_, page) => {
    setCurrentPage(page);
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
    setCurrentSearchQuery("");
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
    setCurrentSearchQuery(normalizedSearchQuery);
    setCurrentPage(1);
  };

  // Fetch the URL mappings
  const { data: paginatedMappedUrls } = useQuery({
    queryFn: async () =>
      (
        await urlMappingsApi.getAll({
          search: currentSearchQuery,
          page: currentPage,
          page_size: pageSize,
        })
      ).data,
    queryKey: [
      "mappings",
      "search",
      { search: currentSearchQuery, page: currentPage, page_size: pageSize },
    ],
  });

  const { results: mappedUrls, count: mappedUrlCount } =
    paginatedMappedUrls ?? { count: 0 };

  // If the `mappedUrlCount` or `pageSize` change recalculate `pageCount`
  React.useEffect(() => {
    setPageCount(Math.ceil(mappedUrlCount / pageSize));
  }, [mappedUrlCount]);

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
        display="flex"
        alignItems="center"
        p={2}
        gap={2}
        flexDirection="column"
      >
        {mappedUrls?.map((mappedUrl) => (
          <URLMapping key={mappedUrl.urlKey} urlMapping={mappedUrl} />
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
