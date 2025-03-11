import { Box, Typography } from "@mui/material";
import SideBarNav from "../../components/Dynamic/Navigation/SideBarNav";

function SalesChannels() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBarNav />
      <Typography>Sales Channels page</Typography>
    </Box>
  );
}

export default SalesChannels;
