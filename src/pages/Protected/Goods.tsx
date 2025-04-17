// import { Box, Card } from "@mui/material";
import DataTable from "../../components/data_display/DataTable";

// TODO: Maybe add a few cards at the side of the list?

function Goods() {
  return (
    <DataTable type="goods" />
    // <Box
    //   sx={{
    //     width: "100%",
    //     height: "100%",
    //     // display: "flex",
    //   }}
    // >
    //   <Box sx={{ width: "1320px" }}>
    //     <DataTable type="goods" />
    //   </Box>
    //   <Box sx={{ display: "flex", flexGrow: "1", justifyContent: "center" }}>
    //     <Card
    //       variant="outlined"
    //       sx={{
    //         width: "240px",
    //         height: "20px",
    //         backgroundColor: "black",
    //       }}
    //     ></Card>
    //   </Box>
    // </Box>
  );
}

export default Goods;
