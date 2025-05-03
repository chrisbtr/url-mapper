import React from "react";
import { AccountInfo } from "api/account";
import { Box, Paper, Stack, Typography, Button } from "@mui/material";
import MappingDataGrid from "components/MappingDataGrid/MappingDataGrid";

export type AccountInfoContainerProps = {
  accountInfo: AccountInfo;
  onLogout?: () => void;
};

const AccountInfoContainer: React.FC<AccountInfoContainerProps> = ({
  accountInfo,
  onLogout,
}) => {
  return (
    <Stack component={Paper} gap={2} p={4} mx={8} my={2}>
      <Typography
        component="h1"
        variant="h5"
        noWrap
        fontWeight={500}
        textAlign="center"
      >
        Welcome {accountInfo.user.username}!
      </Typography>
      <Typography variant="body1" textAlign="center">
        Here you can keep track of all your previously created URL mappings.
      </Typography>
      <Box height={600}>
        <MappingDataGrid userId={accountInfo.user.user_id} />
      </Box>
      <Button onClick={onLogout}>Logout</Button>
    </Stack>
  );
};

export default AccountInfoContainer;
