import { Box } from "@mui/material";
import DataTable from "../../components/data_display/DataTable";
import ModularTabs from "../../components/ModularTabs.tsx";
import SearchInput from "../../components/topbar/SearchInput.tsx";
import FiltersGroup from "../../components/FiltersGroup.tsx";

function Goods() {
  return (
    <>
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
          <DataTable sx={{ mt: "12px" }} type="goods" />
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
    </>
  );
}

export default Goods;
