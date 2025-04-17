import SideBarNav from "../../components/navigation/SideBarNav";
import { Paper, Box } from "@mui/material";
import { Theme, useTheme } from "@mui/material";
import { Outlet } from "react-router";
import TopBar from "../../components/topbar/TopBar";

const TopBarHeight = "83px";

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
      <Box
        component="main"
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <TopBar sx={{ minHeight: TopBarHeight, height: TopBarHeight }} />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: "24px",
            mt: TopBarHeight,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Paper>
  );
}
