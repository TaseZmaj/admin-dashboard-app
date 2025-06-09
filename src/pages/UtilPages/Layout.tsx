import SideBarNav from "../../components/navigation/SideBarNav";
import { Paper, Box } from "@mui/material";
import { Theme, useTheme } from "@mui/material";
import { Outlet } from "react-router";
import TopBar from "../../components/topbar/TopBar";

const TopBarHeight = 83;

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
          overflow: "hidden",
          minHeight: 0,
          // overflow: "hidden",
          // backgroundColor:"tomato"
          // height: "fit-content",
          // minHeight: "100vh",
          // maxHeight: "100%",
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
            // p: "0 24px",
            height: `calc(100vh - ${TopBarHeight}px)`,
            overflowY: "auto", // ✅ enables scrolling
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Paper>
  );
}
