import SideBarNav from "../../components/navigation/SideBarNav";
import { Paper, Box } from "@mui/material";
import { Theme, useTheme } from "@mui/material";
import { Outlet } from "react-router";
import TopBar from "../../components/topbar/TopBar";
import { TopBarHeight } from "../../utils/UiVariables";

export default function Layout() {
  const { palette } = useTheme() as Theme;

  return (
    <Paper
      sx={{
        display: "flex",
        borderRadius: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: palette.background.default,
      }}
    >
      <SideBarNav />
      <Box
        component="main"
        sx={{
          width: "100%",
          height: "100%",
          //Im swapping between auto and hidden to check for visual bugs
          //TODO: Before hosting, make it hidden!
          // overflow: "auto",
          oveflow: "hidden",
        }}
      >
        <TopBar
          sx={{ minHeight: `${TopBarHeight}px`, height: `${TopBarHeight}px` }}
        />
        <Box
          sx={{
            mt: `${TopBarHeight}px`,
            // backgroundColor: "tomato",
            p: "20px 24px 20px 24px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Paper>
  );
}
