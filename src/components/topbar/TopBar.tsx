import { AppBar, Box, SxProps, Toolbar } from "@mui/material";
import { Theme, useTheme } from "@mui/material";
import SearchInput from "./SearchInput.tsx";
import IconDropDownMenu from "../IconDropDownMenu.tsx";
import useResolvedMode from "../../hooks/useResolvedMode.ts";
import CustomBreadCrumbs from "./CustomBreadCrumbs.tsx";

interface TopBarProps {
  sx?: SxProps;
}

export default function TopBar({ sx = {} }: TopBarProps) {
  const { palette } = useTheme() as Theme;
  const resolvedMode = useResolvedMode();

  return (
    <AppBar
      sx={{
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box",
        p: "10px",
        backgroundColor:
          resolvedMode === "light"
            ? palette.background.default
            : palette.background.paper,
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        position: "fixed",
        paddingLeft: "227px",
        ...sx,
      }}
      variant="outlined"
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <CustomBreadCrumbs />
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
