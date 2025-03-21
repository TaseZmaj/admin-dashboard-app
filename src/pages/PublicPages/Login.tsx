import { Paper } from "@mui/material";
import LoginModal from "../../components/Dynamic/Login/LoginModal.tsx";
import ColorModeToggle from "../../components/Dynamic/Util/ColormodeToggle.tsx";
import { useTheme, Theme } from "@mui/material";

export default function Login() {
  const { palette } = useTheme() as Theme;

  return (
    <Paper
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 0,
        backgroundColor: palette.background.default,
      }}
    >
      <ColorModeToggle />
      <LoginModal />
    </Paper>
  );
}
