import { AppBar, Box, Toolbar, useColorScheme } from "@mui/material";
import { Theme, useTheme } from "@mui/material";
import SearchInput from "./SearchInput.tsx";
import IconDropDownMenu from "../Util/IconDropDownMenu.tsx";

export default function TopBar() {
  const { palette } = useTheme() as Theme;
  const { mode } = useColorScheme();

  return (
    <AppBar
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "83px",
        height: "83px",
        boxSizing: "border-box",
        p: "10px",
        backgroundColor:
          mode === "light"
            ? palette.background.default
            : palette.background.paper,
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        position: "relative",
      }}
      position="static"
      variant="outlined"
    >
      <Toolbar>
        <SearchInput />
        <Box
          sx={{
            height: "100%",
            ml: "auto",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "1rem",
            width: "300px",
            // backgroundColor: "teal",
          }}
        >
          <IconDropDownMenu type="notifications" size="small" />
          <IconDropDownMenu type="colorModeToggle" size="small" />
          <IconDropDownMenu type="avatar" size="small" sx={{ ml: "20px" }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
