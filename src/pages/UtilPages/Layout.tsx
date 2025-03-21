import { Outlet } from "react-router";
import SideBarNav from "../../components/Dynamic/Navigation/SideBarNav";
import { Paper, Box } from "@mui/material";
import { Theme, useTheme } from "@mui/material";

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
        <Outlet />
      </Box>
    </Paper>
  );
}
