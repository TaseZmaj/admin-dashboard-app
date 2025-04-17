import { Box } from "@mui/material";
import ModularTabs from "../../components/ModularTabs";
import DataTable from "../../components/data_display/DataTable";
import SearchInput from "../../components/topbar/SearchInput";
import FiltersGroup from "../../components/FiltersGroup";

export default function Services() {
  return (
    <ModularTabs tabNames={["List", "Analytics"]} sx={{ width: "100%" }}>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <SearchInput />
          {/* TODO: Change the filters here there is no point in these */}
          <FiltersGroup includeFilters={["AllTimeBtn", "TimeFilter"]} />
        </Box>
        <DataTable sx={{ mt: "12px" }} type="services" />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <SearchInput />
        <FiltersGroup includeFilters={["AllTimeBtn", "TimeFilter"]} />
      </Box>
    </ModularTabs>
  );
}
