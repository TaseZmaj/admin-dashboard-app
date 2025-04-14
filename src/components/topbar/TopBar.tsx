import {
  AppBar,
  Box,
  Breadcrumbs,
  Toolbar,
  Typography,
  useColorScheme,
} from "@mui/material";
import { Theme, useTheme, Link } from "@mui/material";
import SearchInput from "./SearchInput.tsx";
import IconDropDownMenu from "../IconDropDownMenu.tsx";
import { useLocation } from "react-router";
import { normalizePathname } from "../../utils/stringUtils.ts";

export default function TopBar() {
  const { palette } = useTheme() as Theme;
  const { mode } = useColorScheme();
  const { pathname } = useLocation();

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
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Breadcrumbs sx={{ cursor: "default" }}>
          <Typography>Pages</Typography>
          <Link sx={{ textDecoration: "none" }}>
            {pathname === "/" ? "Homepage" : normalizePathname(pathname)}
          </Link>
        </Breadcrumbs>
        <SearchInput sx={{ ml: "auto" }} />
        <Box
          sx={{
            height: "100%",
            ml: "20px",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            width: "fit-content",
            // backgroundColor: "teal",
          }}
        >
          <IconDropDownMenu shadow={false} type="notifications" size="small" />
          <IconDropDownMenu
            shadow={false}
            type="colorModeToggle"
            size="small"
          />
          <IconDropDownMenu
            shadow={false}
            type="avatar"
            size="small"
            sx={{ ml: "10px" }}
            circular={true}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
