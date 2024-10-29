import React from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

function AppMui({ children }) {
  const theme = createTheme({
    // palette: {
    //   mode: "dark",
    //   primary: {
    //     main: "#333333",
    //     contrastText: "#ffffff",
    //   },
    //   secondary: {
    //     main: "#000000",
    //   },
    //   text: {
    //     primary: "#ffffff",
    //     secondary: "#757575",
    //   },
    //   background: {
    //     default: "#333333",
    //     paper: "#424242",
    //   },
    // },
    // palette: {
    //   primary: {
    //     main: "#ff5722", // Color primario personalizado (ejemplo: naranja)
    //   },
    //   secondary: {
    //     main: "#4caf50", // Color secundario (ejemplo: verde)
    //   },
    // },
    breakpoints: {
      values: {
        xs: 0, // breakpoint para móviles pequeños
        sm: 600, // breakpoint para móviles grandes
        md: 960, // breakpoint para tablets o pantallas medianas
        lg: 1280, // breakpoint para laptops o pantallas grandes
        xl: 1920, // breakpoint para monitores grandes
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default AppMui;
