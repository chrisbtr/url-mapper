import * as React from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridSlotsComponentsProps,
  GridPaginationModel,
  GridRowSelectionModel,
  GridPagination,
  Toolbar,
  QuickFilter,
  QuickFilterControl,
  QuickFilterClear,
  GridFilterModel,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useQuery } from "@tanstack/react-query";
import urlMappingsApi, { UrlMapping } from "api/urlMappings";
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

declare module "@mui/x-data-grid" {
  interface FooterPropsOverrides {
    selectedRows: MappingGridValidRowModel[];
  }
}

export function CustomFooterStatusComponent({
  selectedRows,
}: NonNullable<GridSlotsComponentsProps["footer"]>) {
  return (
    <div>
      {selectedRows?.length === 1 ? (
        <Stack direction="row" alignItems="center" flexWrap='wrap' p={1} gap={1}>
          <Typography variant="subtitle2" component="div">
            {selectedRows[0].urlKey}:
          </Typography>
          <Button
            size="small"
            component={Link}
            to={`/m/${selectedRows[0].urlKey}`}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<OpenInNewIcon />}
          >
            Open
          </Button>
          <Button
            size="small"
            endIcon={<ContentCopyIcon />}
            onClick={() =>
              navigator.clipboard.writeText(
                `${window.location.origin}/m/${selectedRows[0].urlKey}`
              )
            }
          >
            Copy Mapped URL
          </Button>
          <Button
            size="small"
            endIcon={<ContentCopyIcon />}
            onClick={() =>
              navigator.clipboard.writeText(selectedRows[0].fullURL)
            }
          >
            Copy Destination URL
          </Button>
        </Stack>
      ) : null}
      <GridPagination />
    </div>
  );
}

const MappingDataGridToolbar = () => {
  return (
    <Toolbar>
      <QuickFilter expanded>
        <QuickFilterControl
          render={({ ref, ...props }) => (
            <TextField
              {...props}
              inputRef={ref}
              placeholder="Search..."
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: props.value ? (
                    <InputAdornment position="end">
                      <QuickFilterClear
                        edge="end"
                        size="small"
                        aria-label="Clear search"
                      >
                        <CancelIcon fontSize="small" />
                      </QuickFilterClear>
                    </InputAdornment>
                  ) : null,
                  ...props.slotProps?.input,
                },
                ...props.slotProps,
              }}
            />
          )}
        />
      </QuickFilter>
    </Toolbar>
  );
};

type MappingGridValidRowModel = UrlMapping & {
  id: string;
};

const columns: GridColDef<UrlMapping>[] = [
  { field: "urlKey", headerName: "URL Key", width: 300 },
  {
    field: "mappedURL",
    headerName: "Mapped URL",
    width: 200,
    renderCell: ({ row }) => {
      return `${window.location.origin}/m/${row.urlKey}`;
    },
  },
  { field: "fullURL", headerName: "Destination URL", width: 200 },
];

type MappingDataGridProps = {
  userId?: number;
};
const MappingDataGrid: React.FC<MappingDataGridProps> = ({ userId }) => {
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      page: 0,
      pageSize: 5,
    });

  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>();

  const [search, setSearch] = React.useState<string | undefined>("");

  const { data: paginatedMappedUrls, isLoading: paginatedMappedUrlsIsLoading } =
    useQuery({
      queryFn: async () =>
        (
          await urlMappingsApi.getAll({
            search,
            page: paginationModel.page + 1,
            page_size: paginationModel.pageSize,
            userId,
          })
        ).data,
      queryKey: [
        "mappings",
        "search",
        {
          search,
          page: paginationModel.page,
          page_size: paginationModel.pageSize,
          userId,
        },
      ],
    });

  const rows = React.useMemo<
    GridRowsProp<MappingGridValidRowModel> | undefined
  >(
    () =>
      paginatedMappedUrls?.results.map<MappingGridValidRowModel>(
        ({ fullURL, urlKey }) => ({ id: urlKey, urlKey, fullURL })
      ),
    [paginatedMappedUrls]
  );

  const onFilterChange = React.useCallback((filterModel: GridFilterModel) => {
    setSearch(filterModel.quickFilterValues?.join(" "));
  }, []);

  const selectedRows = React.useMemo(() => {
    const gridRowIdIterator = rowSelectionModel?.ids.values();
    if (!gridRowIdIterator) {
      return [];
    }
    return Array.from(gridRowIdIterator)
      .map((rowId) => rows?.find((row) => row.id === rowId))
      .filter(Boolean);
  }, [rowSelectionModel, rows]);

  const rowCountRef = React.useRef(paginatedMappedUrls?.count || 0);

  const rowCount = React.useMemo(() => {
    if (paginatedMappedUrls?.count !== undefined) {
      rowCountRef.current = paginatedMappedUrls?.count;
    }
    return rowCountRef.current;
  }, [paginatedMappedUrls?.count]);

  return (
    <DataGrid
      showToolbar
      rows={rows}
      columns={columns}
      loading={paginatedMappedUrlsIsLoading}
      rowCount={rowCount}
      pageSizeOptions={[5, 10]}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      rowSelectionModel={rowSelectionModel}
      onRowSelectionModelChange={setRowSelectionModel}
      paginationMode="server"
      filterMode="server"
      onFilterModelChange={onFilterChange}
      slots={{
        footer: CustomFooterStatusComponent,
        toolbar: MappingDataGridToolbar,
      }}
      slotProps={{
        footer: { selectedRows: selectedRows as MappingGridValidRowModel[] },
      }}
    />
  );
};

export default MappingDataGrid;
