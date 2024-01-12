import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link as RouterLink, To } from "react-router-dom";

export type NavBarOption = {
  key?: React.Key;
  to: To;
  label: string;
};

export type TopBarProps = {
  rootNav: NavBarOption;
  navBarOptions?: NavBarOption[];
};

/**
 * Top Navigation AppBar.
 *
 * @param props.rootNav `NavBarOption` for the left component on the TopBar
 * @param props.navBarOptions A list of `NavBarOption` Objects used to create the navigation buttons
 */
const TopBar: React.FC<TopBarProps> = ({ rootNav, navBarOptions = [] }) => {
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
            key={rootNav.key}
            variant="h6"
            noWrap
            component={RouterLink}
            to={rootNav.to}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {rootNav.label}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navBarOptions.map(({ key, label, to }) => (
              <Button
                key={key}
                component={RouterLink}
                to={to}
                sx={{ my: 2, display: "block" }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopBar;
