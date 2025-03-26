import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  SxProps,
  Theme,
  Typography,
  useColorScheme,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import DummyIcon2 from "../../../assets/DummyIcon2.png";

interface UserAvatarProps {
  sx?: SxProps;
  size?: "tiny" | "small" | "medium" | "large";
  glow?: boolean;
}

export default function UserAvatar({
  sx = {},
  size = "medium",
  glow = false,
}: UserAvatarProps) {
  const { username } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [paperElevation, setPaperElevation] = useState<number>(1);

  const { palette } = useTheme() as Theme;
  const { mode, systemMode } = useColorScheme();

  const resolvedMode = (systemMode || mode) as "light" | "dark";

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }
  function handleHoverEffect() {
    resolvedMode === "dark" ? setPaperElevation(1) : () => null;
  }
  function handleCloseMenu() {
    handleHoverEffect();
    setAnchorEl(null);
  }

  // TODO: FIX BORDER COLOR ON GLOW MODE - ITS NOT APPEARING WHEN glow={true}

  return (
    <Paper
      onMouseEnter={() => resolvedMode === "dark" && setPaperElevation(5)}
      onMouseLeave={() => resolvedMode === "dark" && setPaperElevation(1)}
      elevation={paperElevation}
      sx={{
        borderRadius: "50%",
        ml: "40px",
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
      <IconButton disableRipple sx={{ p: "0" }} onClick={(e) => handleClick(e)}>
        <Avatar
          alt={username}
          src={DummyIcon2}
          sx={{
            width: "42px",
            height: "42px",
          }}
        ></Avatar>
      </IconButton>
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
          onClick={() => handleCloseMenu()}
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
      </Menu>
    </Paper>
  );
}
