import { Outlet } from "react-router";
import SideBarNav from "../../components/Dynamic/Navigation/SideBarNav";
import { Paper, Box } from "@mui/material";

export default function Layout() {
  return (
    <Paper
      sx={{ display: "flex", borderRadius: 0, width: "100%", height: "100%" }}
    >
      <SideBarNav />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Paper>
  );
}
