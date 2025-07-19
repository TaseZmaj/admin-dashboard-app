import { Box, Typography } from "@mui/material";
import ModularTabs from "../../components/ModularTabs";
import DataTable from "../../components/data_display/DataTable";
import FiltersGroup from "../../components/FiltersGroup";

function SalesChannels() {
  return (
    <ModularTabs
      tabNames={[
        "All Sales Channels",
        "Physical Stores",
        "Online Stores",
        "Analytics",
      ]}
    >
      {/* All sales channels list TAB */}
      <DataTable type="salesChannels"></DataTable>

      {/* Physical location stores TAB */}
      <DataTable type="salesChannels/physicalStores"></DataTable>

      {/* Online stores TAB */}
      <DataTable type="salesChannels/onlineStores"></DataTable>

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

export default SalesChannels;
