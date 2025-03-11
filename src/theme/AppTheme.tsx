import { ThemeProvider, createTheme } from "@mui/material/styles";
import { orange, blue, red } from "@mui/material/colors";

export default function AppTheme({ children }: { children: React.ReactNode }) {
  const lightMode = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: orange[400], //#ffca28
        light: orange[200],
        dark: orange[600],
      },
      secondary: {
        main: blue[400],
        light: blue[200],
        dark: blue[700],
      },
      warning: {
        main: red[600],
      },
    },
    typography: {
      fontFamily: ["Inter", "Roboto"].join(","),
    },
  });
  const darkMode = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: orange[400],
        light: orange[200],
        dark: orange[600],
      },
      secondary: {
        main: blue[400],
        light: blue[200],
        dark: blue[700],
      },
      warning: {
        main: red[600],
      },
    },
  });
  return <ThemeProvider theme={darkMode}>{children}</ThemeProvider>;
}
