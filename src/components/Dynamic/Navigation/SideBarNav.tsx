import { Box, Drawer, drawerClasses } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NavMenu from "./NavMenu.tsx";
import Logo from "../../Presentational/Logo";

const drawerWidth = "220px";

function SideBarNav() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .${drawerClasses.paper}`]: {
          width: drawerWidth,
          backgroundColor: "background.paper",
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: "20px 20px 15px 20px",
        }}
      >
        <Logo size="small" />
        <MenuRoundedIcon sx={{ ml: "auto", cursor: "pointer" }} />
      </Box>
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
        includeDividers={true}
        topBorder={true}
        bottomBorder={false}
      />
      <NavMenu
        links={["logout"]}
        includeDividers={false}
        topBorder={true}
        bottomBorder={false}
        position="bottom"
      />
    </Drawer>
  );
}

export default SideBarNav;
