import { AppBar, Box, Toolbar, useColorScheme } from "@mui/material";
import { Theme, useTheme } from "@mui/material";
import ColorModeToggle from "../Util/ColorModeToggle";
import SearchInput from "./SearchInput.tsx";
import UserAvatar from "./UserAvatar.tsx";

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
          <ColorModeToggle size="small" />
          <ColorModeToggle size="small" />
          <ColorModeToggle size="small" />
          <ColorModeToggle size="small" />
          <UserAvatar />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
