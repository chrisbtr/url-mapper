import React from "react";
import { AccountInfo } from "api/account";
import { Box, Paper, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useQuery } from "@tanstack/react-query";
import urlMappingsApi from "api/urlMappings";
import URLMapping from "components/URLMapping/URLMapping";

export type AccountInfoContainerProps = {
  accountInfo: AccountInfo;
  onLogout?: () => void;
};

const AccountInfoContainer: React.FC<AccountInfoContainerProps> = ({
  accountInfo,
  onLogout,
}) => {
  const { data: paginatedMappedUrls, isSuccess: paginatedMappedUrlsIsSuccess } =
    useQuery({
      queryFn: async () =>
        (
          await urlMappingsApi.getAll({
            search: "",
            page: 1,
            page_size: 100,
            userId: accountInfo.user.user_id,
          })
        ).data,
      queryKey: [
        "mappings",
        {
          search: "",
          page: 1,
          page_size: 100,
          userId: accountInfo.user.user_id,
        },
      ],
    });
  return (
    <Stack component={Paper} p={2} gap={1} width="80%">
      <Typography variant="h5" noWrap fontWeight={500} textAlign="center">
        Welcome {accountInfo.user.username}!
      </Typography>
      <Typography variant="body1" textAlign="center">
        Here you can keep track of all your previously created URL mappings.
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        p={2}
        gap={2}
        flexDirection="column"
      >
        {paginatedMappedUrlsIsSuccess
          ? paginatedMappedUrls.results.map((mapping) => (
              <URLMapping key={mapping.urlKey} urlMapping={mapping} />
            ))
          : null}
      </Box>
      <Button onClick={onLogout}>Logout</Button>
    </Stack>
  );
};

export default AccountInfoContainer;
