import { Box, Typography } from "@mui/material";
import SideBarNav from "../../components/Dynamic/Navigation/SideBarNav";

function Employees() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBarNav />
      <Typography>Employees page</Typography>
    </Box>
  );
}

export default Employees;
