import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0066FF",
      light: "#C2D9FF",
      dark: "#2940B3",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
    },
  },
  typography: {
    allVariants: {
      color: "#0066FF",
    },
  },
});
