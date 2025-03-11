import { Box, Typography } from "@mui/material";
import SideBarNav from "../../components/Dynamic/Navigation/SideBarNav";

function Services() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBarNav />
      <Typography>Services page</Typography>
    </Box>
  );
}

export default Services;
