import {
  Card,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useColorScheme,
  Theme,
  Paper,
  SxProps,
} from "@mui/material";
import { useState } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useTheme } from "@mui/material";

interface ColorModeToggleProps {
  size?: "small" | "medium" | "large";
  sx?: SxProps<Theme>;
  glow?: boolean;
}

type ColorMode = "light" | "dark" | "system";

const ICON_SIZE = {
  small: "1.2rem",
  medium: "1.5rem",
  large: "1.8rem",
};

export default function ColorModeToggle({
  size = "medium",
  sx = {},
  glow = false,
}: ColorModeToggleProps) {
  const { palette } = useTheme() as Theme;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [paperElevation, setPaperElevation] = useState(1);

  const { mode, systemMode, setMode } = useColorScheme();

  const resolvedMode = (systemMode || mode) as "light" | "dark";

  function handleHoverEffect() {
    resolvedMode === "dark" ? setPaperElevation(1) : () => null;
  }
  function handleCloseMenu() {
    handleHoverEffect();
    setAnchorEl(null);
  }
  function handleClick(e: React.MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget);
  }
  function handleModeChange(mode: ColorMode) {
    setMode(mode);
    handleCloseMenu();
  }

  const iconSX = {
    fontSize: ICON_SIZE[size],
  };
  // TODO: Add some more abstraction and customization
  // TODO: If mode === undefined handle-ni
  // TODO: Make the code a bit more readable

  return (
    <>
      <Paper
        onMouseEnter={() => resolvedMode === "dark" && setPaperElevation(5)}
        onMouseLeave={() => resolvedMode === "dark" && setPaperElevation(1)}
        elevation={paperElevation}
        sx={{
          transitionDelay: "0s",
          [`&.MuiPaper-elevation${1}`]: {
            boxShadow:
              resolvedMode === "dark" && glow === true
                ? "rgba(255, 202, 40, 0.1) 0px 5px 24px"
                : "",
          },
          [`&.MuiPaper-elevation${5}`]: {
            boxShadow:
              resolvedMode === "dark" && glow === true
                ? "rgba(255, 202, 40, 0.2) 0px 5px 24px"
                : "",
          },
          ...sx,
        }}
      >
        <Card
          variant="outlined"
          sx={{
            borderColor:
              resolvedMode === "dark" && glow === true
                ? palette.primary.light
                : "",
          }}
        >
          <IconButton disableRipple onClick={(e) => handleClick(e)}>
            {resolvedMode === "dark" ? (
              <LightModeOutlinedIcon sx={iconSX} />
            ) : null}
            {resolvedMode === "light" ? (
              <DarkModeOutlinedIcon sx={iconSX} />
            ) : null}
          </IconButton>
        </Card>
      </Paper>
      <Menu
        sx={{
          "& .MuiPaper-root": {
            borderColor:
              resolvedMode === "dark" && glow === true
                ? palette.primary.light
                : "",
          },
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          handleCloseMenu();
        }}
        slotProps={{
          paper: {
            variant: "outlined",
            elevation: 6,
            sx: {
              my: "4px",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          selected={mode === "system"}
          sx={{
            m: "1px 5px",
            borderRadius: 1,
            "&.Mui-selected": {
              backgroundColor: mode === "light" ? palette.primary.light : "",
            },
            "&.Mui-selected:hover": {
              backgroundColor: mode === "light" ? palette.primary.light : "",
            },
          }}
          onClick={() => handleModeChange("system")}
        >
          <Typography>System</Typography>
        </MenuItem>
        <MenuItem
          selected={mode === "light"}
          sx={{
            m: "0 5px",
            borderRadius: 1,
            "&.Mui-selected": {
              backgroundColor: palette.primary.light,
            },
            "&.Mui-selected:hover": {
              backgroundColor: palette.primary.light,
            },
          }}
          onClick={() => handleModeChange("light")}
        >
          <Typography>Light</Typography>
        </MenuItem>
        <MenuItem
          selected={mode === "dark"}
          sx={{
            m: "0 5px",
            borderRadius: 1,
          }}
          onClick={() => handleModeChange("dark")}
        >
          <Typography>Dark</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
