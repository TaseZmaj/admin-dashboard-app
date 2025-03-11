import { Box, Typography } from "@mui/material";
import SideBarNav from "../../components/Dynamic/Navigation/SideBarNav";

function Error() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBarNav />
      <Typography>Error 404: Page not found</Typography>
    </Box>
  );
}

export default Error;
