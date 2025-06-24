import { Box } from "@mui/material";
import DataTable from "../../components/data_display/DataTable";
import ModularTabs from "../../components/ModularTabs.tsx";
// import SearchInput from "../../components/topbar/SearchInput.tsx";
import FiltersGroup from "../../components/FiltersGroup.tsx";

// TODO: Add a refresh button to refetch the Goods - at the top of the page above the table

function Goods() {
  return (
    <>
      <ModularTabs
        tabNames={["All Goods", "Tires", "Rims", "Car Batteries", "Analytics"]}
        sx={{ width: "100%", minHeight: "100%" }}
      >
        {/* All goods List TAB */}
        <DataTable
          sx={{ mt: "12px", flexGrow: 1 }}
          type="goods"
          includeSearch={true}
        />

        {/* Tires list TAB*/}
        <DataTable
          sx={{ mt: "12px", flexGrow: 1 }}
          includeSearch={true}
          type="goods/tires"
        />

        {/* Rims list TAB */}
        <DataTable
          sx={{ mt: "12px", flexGrow: 1 }}
          includeSearch={true}
          type="goods/rims"
        />

        {/* Car Batteries list TAB */}
        <DataTable
          sx={{ mt: "12px", flexGrow: 1 }}
          includeSearch={true}
          type="goods/car_batteries"
        />

        {/* Analytics TAB */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* <SearchInput /> */}
          <FiltersGroup includeFilters={["AllTimeBtn", "TimeFilter"]} />
        </Box>
      </ModularTabs>
    </>
  );
}

export default Goods;
