import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {
  StyledEngineProvider,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { BrowserRouter, Routes, Route, RouteProps } from "react-router-dom";
import TopBar, { NavBarOption } from "./components/TopBar/TopBar";
import App from "./App";
import theme from "./theme";
import RedirectRoute from "./routes/RedirectRoute/RedirectRoute";
import AllMappingsRoute from "./routes/AllMappingsRoute/AllMappingsRoute";
import CreateMappingRoute from "./routes/CreateMappingRoute/CreateMappingRoute";
import AccountRoute from "./routes/AccountRoute/AccountRoute";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const navRouteProps: Record<string, RouteProps> = {
  "URL Mapper": {
    path: "/",
    element: <App />,
  },
  "Account": {
    path: "/account",
    element: <AccountRoute />
  },
  "Create Mapping": {
    path: "/create",
    element: <CreateMappingRoute />,
  },
  "All Mappings": {
    path: "/mappings",
    element: <AllMappingsRoute />,
  },
};

const routePropToNavBarOption = (
  navRoutes: Record<string, RouteProps>
): NavBarOption[] => {
  return Object.keys(navRoutes).map((label) => ({
    key: `navBar-${label.trim()}`,
    to: navRoutes[label].path ?? "",
    label: label,
  }));
};

const [rootNav, ...navBarOptions] = routePropToNavBarOption(navRouteProps);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <TopBar rootNav={rootNav} navBarOptions={navBarOptions} />
          <Routes>
            {Object.keys(navRouteProps).map((label) => (
              <Route key={`route-${label.trim()}`} {...navRouteProps[label]} />
            ))}
            <Route path="/m/:urlKey" element={<RedirectRoute />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
