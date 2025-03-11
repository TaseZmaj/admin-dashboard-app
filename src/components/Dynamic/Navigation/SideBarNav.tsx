import { Drawer } from "@mui/material";
import NavMenu from "./NavMenu";

const drawerWidth = "220px";

export default function SideBarNav() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        width: drawerWidth,
        minWidth: "fit-content",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <NavMenu
        links={[
          "dashboard",
          "goods",
          "services",
          "employees",
          "sales channels",
          "customers",
          "orders",
          "compare",
        ]}
      />
    </Drawer>
  );
}
