import { Outlet, useLocation } from "react-router";
import SideBarNav from "../../components/navigation/SideBarNav";
import { Paper, Box, Typography, Button, useColorScheme } from "@mui/material";
import { Theme, useTheme } from "@mui/material";
import TopBar from "../../components/topbar/TopBar";
import { capitalize, normalizePathname } from "../../utils/stringUtils";
import useAuth from "../../hooks/useAuth";
import DropDownMenu from "../../components/DropDownMenu";

export default function Layout() {
  const { palette } = useTheme() as Theme;
  const { username } = useAuth();
  const { pathname } = useLocation();

  const { systemMode, mode } = useColorScheme();
  const resolvedMode = (systemMode || mode) as "light" | "dark";

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
        <TopBar />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: "24px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              mb: "7px",
              minHeight: "51px",
              alignItems: "center",
            }}
          >
            {pathname === "/" ? (
              <Box sx={{ flexDirection: "column" }}>
                <Typography variant="h3" sx={{ fontSize: "1.25rem" }}>
                  Welcome back, {capitalize(username)}!
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{ pt: "6px", fontSize: "0.9rem" }}
                >
                  Here's whats been going on with the business lately...
                </Typography>
              </Box>
            ) : (
              <Typography variant="h2" sx={{ fontSize: "1.8rem" }}>
                {normalizePathname(pathname)} Analytics
              </Typography>
            )}
            <Box
              sx={{
                ml: "auto",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <DropDownMenu
                size="small"
                type="timeFilter"
                sx={{ width: "100px" }}
              />
              <Button
                variant={resolvedMode === "light" ? "contained" : "outlined"}
                disableElevation
                sx={{
                  minHeight: "40px",
                  color: resolvedMode === "light" ? palette.common.white : null,
                  textTransform: "none",
                  pt: "8px",
                  backgroundColor:
                    resolvedMode === "light" ? palette.grey[900] : null,
                }}
              >
                View All Time
              </Button>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
