import { Paper } from "@mui/material";
import LoginModal from "../../components/Dynamic/Login/LoginModal.tsx";
import { useTheme, Theme } from "@mui/material";
import IconDropDownMenu from "../../components/Dynamic/Util/IconDropDownMenu.tsx";

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
      <IconDropDownMenu
        type="colorModeToggle"
        sx={{ position: "absolute", right: 25, top: 25 }}
      />
      <LoginModal />
    </Paper>
  );
}
