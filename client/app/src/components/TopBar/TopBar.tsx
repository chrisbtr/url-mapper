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
    <AppBar
      position="static"
      variant="outlined"
      color="secondary"
      elevation={0}
    >
      <Container maxWidth="xl" sx={{ mx: 4 }}>
        <Toolbar disableGutters>
          <Typography
            data-testid="nav-link-home"
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
              data-testid="nav-link-account"
              key="Account"
              sx={{ my: 2, display: "block" }}
            >
              Account
            </Button>
            <Button
              data-testid="nav-link-create"
              key="CreateMapping"
              component={RouterLink}
              to="/create"
              sx={{ my: 2, display: "block" }}
            >
              Create Mapping
            </Button>
            <Button
              data-testid="nav-link-mappings"
              key="AllMappings"
              component={RouterLink}
              to="/mappings"
              sx={{ my: 2, display: "block" }}
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
