import { Outlet } from "react-router";
import SideBarNav from "../../components/navigation/SideBarNav";
import { Paper, Box } from "@mui/material";
import { Theme, useTheme } from "@mui/material";
import TopBar from "../../components/topbar/TopBar";

export default function Layout() {
  const { palette } = useTheme() as Theme;
  return (
    <Paper
      sx={{
        display: "flex",
        borderRadius: 0,
        width: "100%",
        height: "100%",
        backgroundColor: palette.background.default,
      }}
    >
      <SideBarNav />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <TopBar />
        <Box sx={{ p: "20px" }}>
          <Outlet />
        </Box>
      </Box>
    </Paper>
  );
}
