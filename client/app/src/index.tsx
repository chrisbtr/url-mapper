import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { StyledEngineProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar/TopBar";
import App from "./App";
import RedirectRoute from "./routes/RedirectRoute/RedirectRoute";
import AllMappingsRoute from "./routes/AllMappingsRoute/AllMappingsRoute";
import CreateMappingRoute from "./routes/CreateMappingRoute/CreateMappingRoute";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/mappings" element={<AllMappingsRoute />} />
          <Route path="/create" element={<CreateMappingRoute />} />
          <Route path="/m/:urlKey" element={<RedirectRoute />} />
        </Routes>
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
