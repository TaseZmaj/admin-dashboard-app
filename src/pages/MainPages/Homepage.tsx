import { Box, Typography } from "@mui/material";
import SideBarNav from "../../components/Dynamic/Navigation/SideBarNav.tsx";

function Homepage() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBarNav />
      <Typography>Dashboard Homepage</Typography>
    </Box>
  );
}

export default Homepage;
