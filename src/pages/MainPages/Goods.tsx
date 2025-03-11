import { Box, Typography } from "@mui/material";
import SideBarNav from "../../components/Dynamic/Navigation/SideBarNav";

function Goods() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBarNav />
      <Typography>Goods page</Typography>
    </Box>
  );
}

export default Goods;
