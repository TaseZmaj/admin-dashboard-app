import { Box, Drawer, drawerClasses, Theme, useTheme } from "@mui/material";
// import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NavMenu from "./NavMenu";
import Logo from "../presentational/Logo";
import { TopBarHeight } from "../../utils/UiVariables";

const drawerWidth = "220px";

function SideBarNav() {
  const { palette } = useTheme() as Theme;

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
          justifyContent: "center",
          p: "17px 10px",
          minHeight: TopBarHeight,
          height: TopBarHeight,
          boxSizing: "border-box",
          borderBottomWidth: "1px",
          borderBottomColor: palette.divider,
          borderBlockEndStyle: "solid",
          backgroundColor: "background.paper",
        }}
      >
        <Logo size="medium" homeLink={true} />
        {/* <MenuRoundedIcon sx={{ ml: "auto", cursor: "pointer" }} /> */}
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
          "reviews",
          "compare",
        ]}
        includeDividers={true}
        topBorder={false}
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
