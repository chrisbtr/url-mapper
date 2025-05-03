import React from "react";
import MappingDataGrid from "components/MappingDataGrid/MappingDataGrid";
import { Paper, Stack, Box, Typography } from "@mui/material";

const AllMappingsRoute: React.FC = () => {
  return (
    <Stack component={Paper} gap={2} p={4} mx={8} my={2}>
      <Typography
        variant="h5"
        component="h1"
        noWrap
        fontWeight={500}
        textAlign="center"
      >
        All Mappings
      </Typography>
      <Box height={600}>
        <MappingDataGrid />
      </Box>
    </Stack>
  );
};

export default AllMappingsRoute;
