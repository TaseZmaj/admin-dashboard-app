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
import { useTheme } from "@mui/material";
import useAuth from "../hooks/useAuth";

// Icons and imgs
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import avatarImg from "../assets/avatars/Avatar4.png";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";

interface IconDropDownMenuProps {
  sx?: SxProps<Theme>;
  size?: "tiny" | "small" | "medium" | "large";
  type: "avatar" | "colorModeToggle" | "notifications";
  shadow?: boolean;
  glow?: boolean;
  circular?: boolean;
}

type ColorMode = "light" | "dark" | "system";

const ICON_SIZE = {
  tiny: "1rem",
  small: "1.35rem",
  medium: "1.5rem",
  large: "1.8rem",
};

const AVATAR_WIDTH_HEIGHT = {
  tiny: "40px",
  small: "45px",
  medium: "54px",
  large: "60px",
};

export default function IconDropDownMenu({
  size = "medium",
  sx = {},
  glow = false,
  circular = false,
  shadow = true,
  type,
}: IconDropDownMenuProps) {
  const { palette } = useTheme() as Theme;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { mode, systemMode, setMode } = useColorScheme();
  const [paperElevation, setPaperElevation] = useState<number>(shadow ? 1 : 0);
  const { username } = useAuth();

  const resolvedMode = (systemMode || mode) as "light" | "dark";

  const iconSX = {
    fontSize: ICON_SIZE[size],
  };

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget);
  }
  function handleHoverEffect() {
    resolvedMode === "dark" ? shadow && setPaperElevation(1) : () => null;
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

  //TODO: maybe make the menu items abstract 🤔, a lot of the code repeats itself

  // TODO: make the DropDown menu in Avatar INNACESSIBLE if the user is not logged in
  // Or make the pages the list items take the user to - protected

  //TODO: When notifications exist - icon is the bell ringing
  //When there are no notifications - the icon is the normal bell

  return (
    <>
      <Paper
        onMouseEnter={() =>
          resolvedMode === "dark" && shadow && setPaperElevation(5)
        }
        onMouseLeave={() =>
          resolvedMode === "dark" && shadow && setPaperElevation(1)
        }
        elevation={paperElevation}
        sx={{
          borderRadius: circular ? "50%" : "4px",
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
              borderRadius: circular ? "50%" : "4px",
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
            sx={{ p: "0", borderRadius: circular ? "50%" : "4px" }}
            onClick={(e) => handleClick(e)}
          >
            <Avatar
              alt={username}
              src={avatarImg}
              sx={{
                width: AVATAR_WIDTH_HEIGHT[size],
                height: AVATAR_WIDTH_HEIGHT[size],
                borderRadius: circular ? "50%" : "4px",
              }}
            ></Avatar>
          </IconButton>
        ) : null}
        {type === "notifications" ? (
          <Card
            variant="outlined"
            sx={{
              borderRadius: circular ? "50%" : "4px",
              borderColor:
                resolvedMode === "dark" && glow === true
                  ? palette.primary.light
                  : "",
            }}
          >
            <IconButton disableRipple onClick={(e) => handleClick(e)}>
              <NotificationsActiveOutlinedIcon sx={iconSX} />
            </IconButton>
          </Card>
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
        {type === "notifications" ? (
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
              <Typography>Notification 1</Typography>
            </MenuItem>
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
              <Typography>Notification 2</Typography>
            </MenuItem>
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
              <Typography>Notification 3</Typography>
            </MenuItem>
          </>
        ) : null}
      </Menu>
    </>
  );
}
