import { createTheme, PaletteColorOptions } from "@mui/material";

const primary = {
  main: "#009dff",
  light: "#8fceff",
  dark: "#006bcc",
};

const secondary = {
  main: "#ff9900",
  light: "#ffc533",
  dark: "#b28000",
};

const error = {
  main: "#d32f2f",
  light: "#ef5350",
  dark: "#c62828",
};

const warning = {
  main: "#ed6c02",
  light: "#ff9800",
  dark: "#e65100",
};

export const theme = createTheme({
  palette: {
    primary,
    secondary,
    error,
    warning,
  },
  typography: {
    allVariants: {
      color: primary.main,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFF",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" && {
            backgroundColor: primary.main,
            color: "#FFF",
          }),
        }),
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          padding: 0,
          margin: 0,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },
  },
});
