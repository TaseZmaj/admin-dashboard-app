import { Box } from "@mui/material";
import DataTable from "../../components/data_display/DataTable";
import ModularTabs from "../../components/ModularTabs";
import FiltersGroup from "../../components/FiltersGroup";

function Customers() {
  return (
    <ModularTabs
      tabNames={[
        "All Customers",
        "Walk-in customers",
        "Individuals",
        "Wholesale Partners",
        "Business Accounts",
      ]}
      sx={{ width: "100%", minHeight: "100%" }}
    >
      {/* All customers list TAB */}
      <DataTable type="customers" />

      {/* Walk-in customers TAB */}
      <DataTable type="customers/walkInCustomers" />

      {/* Individuals TAB */}
      <DataTable type="customers/individuals" />

      {/* Wholesale Partners TAB */}
      <DataTable type="customers/wholesalePartners"></DataTable>

      {/* Business Accounts TAB */}
      <DataTable type="customers/businessAccounts"></DataTable>

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

export default Customers;
