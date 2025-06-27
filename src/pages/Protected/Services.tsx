import { Box } from "@mui/material";
import ModularTabs from "../../components/ModularTabs";
import DataTable from "../../components/data_display/DataTable";
// import SearchInput from "../../components/topbar/SearchInput";
import FiltersGroup from "../../components/FiltersGroup";

export default function Services() {
  return (
    <>
      <ModularTabs
        tabNames={[
          "All Services",
          "Tire services",
          "Undercarriage repairs",
          "Oil filter changes",
          "Car battery services",
          "Auto AC services",
          "Other services",
          "Analytics",
        ]}
        sx={{ width: "100%", minHeight: "100%" }}
      >
        {/* All services List TAB */}
        <DataTable includeSearch={true} type="services" />

        {/* Tire services list TAB*/}
        <DataTable includeSearch={true} type="services/tires" />

        {/* Undercarriage repairs list TAB */}
        <DataTable includeSearch={true} type="services/undercarriageRepairs" />

        {/* Oil filter changes list TAB */}
        <DataTable includeSearch={true} type="services/oilFilterChanges" />

        {/* Car battery services list TAB */}
        <DataTable includeSearch={true} type="services/carBattery" />

        {/* Auto AC services list TAB */}
        <DataTable includeSearch={true} type="services/autoAc" />

        {/* Other services list TAB */}
        <DataTable includeSearch={true} type="services/other" />

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
