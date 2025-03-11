import { Box, Typography } from "@mui/material";
import SideBarNav from "../../components/Dynamic/Navigation/SideBarNav";

function Customers() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBarNav />
      <Typography>Customers page</Typography>
    </Box>
  );
}

export default Customers;
