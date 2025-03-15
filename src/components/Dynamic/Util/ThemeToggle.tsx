import { IconButton, useColorScheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

export default function ThemeToggle() {
  // const { mode, systemMode } = useColorScheme();

  return (
    <IconButton
      sx={{
        position: "absolute",
        right: 0,
        top: 0,
        m: "500px",
        // border: "1px solid red",
      }}
    >
      <LightModeOutlinedIcon />
    </IconButton>
  );
}
