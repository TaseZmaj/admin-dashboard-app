import { IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

export default function ThemeToggle() {
  return (
    <IconButton
      sx={{
        position: "absolute",
        right: 0,
        top: 0,
        m: "12px",
        // border: "1px solid red",
      }}
    >
      <LightModeOutlinedIcon />
    </IconButton>
  );
}
