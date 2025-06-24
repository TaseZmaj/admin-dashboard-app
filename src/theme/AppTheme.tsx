import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue, red, orange } from "@mui/material/colors";

export default function AppTheme({ children }: { children: React.ReactNode }) {
  const customTheme = createTheme({
    colorSchemes: {
      light: {
        palette: {
          mode: "light",
          primary: {
            main: orange[600], //#ffca28
            light: orange[500],
            dark: orange[700],
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
      },
      dark: {
        palette: {
          mode: "dark",
          primary: {
            main: orange[600],
            light: orange[500],
            dark: orange[700],
          },
          secondary: {
            main: blue[400],
            light: blue[200],
            dark: blue[700],
          },
          warning: {
            main: red[600],
          },
          background: {
            default: "#000000",
          },
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    //TODO: Make components like this one and separate them in different files
    // components: {
    //   MuiPaper: {
    //     styleOverrides: {
    //       root: {
    //         boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Custom shadow
    //         // Optionally, you can specify shadows for different elevations
    //         "&.MuiPaper-elevation1": {
    //           boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Light shadow for elevation 1
    //         },
    //         "&.MuiPaper-elevation2": {
    //           boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)", // Slightly stronger shadow for elevation 2
    //         },
    //         // You can add more elevation levels as needed
    //       },
    //     },
    //   },
    // },
  });
  return <ThemeProvider theme={customTheme}>{children}</ThemeProvider>;
}
