import { Paper } from "@mui/material";
import LoginModal from "../../components/Dynamic/Login/LoginModal.tsx";
import ThemeToggle from "../../components/Dynamic/Util/ThemeToggle.tsx";

export default function Login() {
  return (
    <Paper
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 0,
      }}
    >
      <ThemeToggle />
      <LoginModal />
    </Paper>
  );
}
