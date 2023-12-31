import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";

const TopBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            URL Mapper
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="Account"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Account
            </Button>
            <Button
              key="CreateMapping"
              component={RouterLink}
              to="/create"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Create Mapping
            </Button>
            <Button
              key="AllMappings"
              component={RouterLink}
              to="/mappings"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              All Mappings
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopBar;
