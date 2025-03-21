import {
  Card,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useColorScheme,
  Theme,
  Paper,
} from "@mui/material";
import { useState } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useTheme } from "@mui/material";

interface ColorModeToggleProps {
  size?: "small" | "medium" | "large";
}

type ColorMode = "light" | "dark" | "system";

export default function ColorModeToggle({
  size = "medium",
}: ColorModeToggleProps) {
  const { palette } = useTheme() as Theme;
  const { mode, systemMode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [paperElevation, setPaperElevation] = useState(1);
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

  // TODO: Add some more abstraction and customization
  // TODO: If mode === undefined handle-ni
  // TODO: Make the code a bit more readable

  return (
    <>
      <Paper
        onMouseEnter={() =>
          resolvedMode === "dark" ? setPaperElevation(5) : () => null
        }
        onMouseLeave={() =>
          resolvedMode === "dark" ? setPaperElevation(1) : () => null
        }
        elevation={paperElevation}
        sx={{
          position: "absolute",
          right: 25,
          top: 25,
          transitionDelay: 0,
          [`&.MuiPaper-elevation${1}`]: {
            boxShadow:
              resolvedMode === "dark"
                ? "rgba(255, 202, 40, 0.1) 0px 5px 24px"
                : "",
          },
          [`&.MuiPaper-elevation${5}`]: {
            boxShadow:
              resolvedMode === "dark"
                ? "rgba(255, 202, 40, 0.2) 0px 5px 24px"
                : "",
          },
        }}
      >
        <Card
          variant="outlined"
          sx={{
            borderColor: resolvedMode === "dark" ? palette.primary.light : "",
          }}
        >
          <IconButton size={size} disableRipple onClick={(e) => handleClick(e)}>
            {mode === "dark" ? <LightModeOutlinedIcon /> : null}
            {mode === "light" ? <DarkModeOutlinedIcon /> : null}
            {mode === "system" ? <LightModeOutlinedIcon /> : null}
          </IconButton>
        </Card>
      </Paper>
      <Menu
        sx={{
          "& .MuiPaper-root": {
            borderColor: resolvedMode === "dark" ? palette.primary.light : "",
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
