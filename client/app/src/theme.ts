import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E7D32",
      contrastText: "#2E7D32",
    },
    secondary: {
      main: "#FAFAFA",
      contrastText: "#2E7D32",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FAFAFA",
    },
  },
});

export default theme;
