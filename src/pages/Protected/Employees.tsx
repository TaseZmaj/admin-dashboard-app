import { Box } from "@mui/material";
import ModularTabs from "../../components/ModularTabs";
import DataTable from "../../components/data_display/DataTable";
import FiltersGroup from "../../components/FiltersGroup";

function Employees() {
  return (
    <ModularTabs
      tabNames={["All Employees", "Salespersons", "Servicemen", "Analytics"]}
      sx={{ width: "100%", minHeight: "100%" }}
    >
      {/* All employees List TAB */}
      <DataTable type="employees" />

      {/* Salespersons list TAB*/}
      <DataTable type="employees/salespersons" />

      {/* Servicemen list TAB */}
      <DataTable type="employees/servicemen" />

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
  );
}

export default Employees;
