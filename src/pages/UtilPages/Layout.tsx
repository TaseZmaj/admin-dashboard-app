import { Outlet } from "react-router";
import SideBarNav from "../../components/Dynamic/Navigation/SideBarNav";
import { Paper } from "@mui/material";

export default function Layout() {
  return (
    <Paper sx={{ display: "flex", borderRadius: 0 }}>
      <SideBarNav />
      <Outlet />
    </Paper>
  );
}
