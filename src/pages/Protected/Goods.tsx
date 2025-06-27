import { Box } from "@mui/material";
import DataTable from "../../components/data_display/DataTable";
import ModularTabs from "../../components/ModularTabs.tsx";
// import SearchInput from "../../components/topbar/SearchInput.tsx";
import FiltersGroup from "../../components/FiltersGroup.tsx";

// TODO: Add a refresh button to refetch the Goods - at the top of the page above the table

export default function Goods() {
  return (
    <>
      <ModularTabs
        tabNames={["All Goods", "Tires", "Rims", "Car Batteries", "Analytics"]}
        sx={{ width: "100%", minHeight: "100%" }}
      >
        {/* TODO: Include the price_without_tax and cost for each of the goods */}

        {/* All goods List TAB */}
        <DataTable includeSearch={true} type="goods" />

        {/* Tires list TAB*/}
        <DataTable includeSearch={true} type="goods/tires" />

        {/* Rims list TAB */}
        <DataTable includeSearch={true} type="goods/rims" />

        {/* Car Batteries list TAB */}
        <DataTable includeSearch={true} type="goods/carBatteries" />

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
