import { Box, Typography } from "@mui/material";
import SideBarNav from "../../components/Dynamic/Navigation/SideBarNav";

function Orders() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBarNav />
      <Typography>Orders page</Typography>
    </Box>
  );
}

export default Orders;
