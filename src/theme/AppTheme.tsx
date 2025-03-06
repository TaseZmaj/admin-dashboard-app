import { ThemeProvider, createTheme } from "@mui/material/styles";
import { orange, blue } from "@mui/material/colors";

export default function AppTheme({ children }: { children: React.ReactNode }) {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: orange[400],
        light: orange[200],
        dark: orange[600],
      },
      secondary: {
        main: blue[200],
        light: blue[400],
        dark: blue[700],
      },
    },
    typography: {
      fontFamily: ["Inter", "Roboto"].join(","),
    },
  });
  return <ThemeProvider theme={customTheme}>{children}</ThemeProvider>;
}
