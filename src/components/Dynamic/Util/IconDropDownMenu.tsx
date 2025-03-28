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
  Avatar,
} from "@mui/material";
import { useState } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useTheme } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import DummyIcon2 from "../../../assets/DummyIcon2.png";

interface IconDropDownMenuProps {
  sx?: SxProps<Theme>;
  size?: "tiny" | "small" | "medium" | "large";
  type: "avatar" | "colorModeToggle";
  glow?: boolean;
}

type ColorMode = "light" | "dark" | "system";

const ICON_SIZE = {
  tiny: "1rem",
  small: "1.2rem",
  medium: "1.5rem",
  large: "1.8rem",
};

const AVATAR_WIDTH_HEIGHT = {
  tiny: "37px",
  small: "42px",
  medium: "54px",
  large: "60px",
};

export default function IconDropDownMenu({
  size = "medium",
  sx = {},
  glow = false,
  type,
}: IconDropDownMenuProps) {
  const { palette } = useTheme() as Theme;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { mode, systemMode, setMode } = useColorScheme();
  const [paperElevation, setPaperElevation] = useState<number>(1);
  const { username } = useAuth();

  const resolvedMode = (systemMode || mode) as "light" | "dark";

  const iconSX = {
    fontSize: ICON_SIZE[size],
  };

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget);
  }
  function handleHoverEffect() {
    resolvedMode === "dark" ? setPaperElevation(1) : () => null;
  }
  function handleCloseMenu() {
    handleHoverEffect();
    setAnchorEl(null);
  }

  //   For colormode toggle
  function handleModeChange(mode: ColorMode) {
    setMode(mode);
    handleCloseMenu();
  }

  // TODO: make the DropDown menu in Avatar INNACESSIBLE if the user is not logged in
  // Or make the pages the list items take the user to - protected

  return (
    <>
      <Paper
        onMouseEnter={() => resolvedMode === "dark" && setPaperElevation(5)}
        onMouseLeave={() => resolvedMode === "dark" && setPaperElevation(1)}
        elevation={paperElevation}
        sx={{
          borderRadius: type === "avatar" ? "50%" : "4px",
          transitionDelay: "0s",
          maxWidth: "fit-content",
          maxHeight: "fit-content",
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
        {type === "colorModeToggle" ? (
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
        ) : null}
        {type === "avatar" ? (
          <IconButton
            disableRipple
            sx={{ p: "0" }}
            onClick={(e) => handleClick(e)}
          >
            <Avatar
              alt={username}
              src={DummyIcon2}
              sx={{
                width: AVATAR_WIDTH_HEIGHT[size],
                height: AVATAR_WIDTH_HEIGHT[size],
              }}
            ></Avatar>
          </IconButton>
        ) : null}
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
        {type === "colorModeToggle" ? (
          <>
            <MenuItem
              selected={mode === "system"}
              sx={{
                m: "1px 5px",
                borderRadius: 1,
                "&.Mui-selected": {
                  backgroundColor:
                    mode === "light" ? palette.primary.light : "",
                },
                "&.Mui-selected:hover": {
                  backgroundColor:
                    mode === "light" ? palette.primary.light : "",
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
          </>
        ) : null}
        {type === "avatar" ? (
          <>
            <MenuItem
              onClick={() => handleCloseMenu()}
              sx={{
                m: "1px 5px",
                borderRadius: 1,
                "&.Mui-selected": {
                  backgroundColor:
                    mode === "light" ? palette.primary.light : "",
                },
                "&.Mui-selected:hover": {
                  backgroundColor:
                    mode === "light" ? palette.primary.light : "",
                },
              }}
            >
              <Typography>Item 1</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => handleCloseMenu()}
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
            >
              <Typography>Item 2</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => handleCloseMenu()}
              sx={{
                m: "0 5px",
                borderRadius: 1,
              }}
            >
              <Typography>Item 3</Typography>
            </MenuItem>
          </>
        ) : null}
      </Menu>
    </>
  );
}
