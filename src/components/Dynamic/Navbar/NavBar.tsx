import { Drawer } from "@mui/material";
import NavMenu from "./NavMenu";

export default function NavBar() {
  return (
    <Drawer variant="permanent">
      <NavMenu
        links={[
          "dashboard",
          "goods",
          "services",
          "analytics",
          "sales channels",
          "customers",
          "orders",
          "compare",
        ]}
      />
    </Drawer>
  );
}
