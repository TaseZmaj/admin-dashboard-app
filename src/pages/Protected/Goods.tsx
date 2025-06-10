import { Box } from "@mui/material";
import DataTable from "../../components/data_display/DataTable";
import ModularTabs from "../../components/ModularTabs.tsx";
import SearchInput from "../../components/topbar/SearchInput.tsx";
import FiltersGroup from "../../components/FiltersGroup.tsx";

function Goods() {
  return (
    <>
      <ModularTabs
        tabNames={["All Goods", "Tires", "Rims", "Car Batteries", "Analytics"]}
        sx={{ width: "100%", minHeight: "100%" }}
      >
        {/* All goods List TAB */}
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
            {/* <FiltersGroup includeFilters={["AllTimeBtn", "TimeFilter"]} /> */}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              overflow: "hidden",
              minHeight: 0,
            }}
          >
            <DataTable sx={{ mt: "12px", flexGrow: 1 }} type="goods" />
          </Box>
        </Box>
        {/* Tires list TAB*/}
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <SearchInput />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              overflow: "hidden",
              minHeight: 0,
            }}
          >
            {/* TODO: Make this possible */}
            {/* <DataTable sx={{ mt: "12px", flexGrow: 1 }} type="goods/tires" /> */}
            <DataTable sx={{ mt: "12px", flexGrow: 1 }} type="services" />
          </Box>
        </Box>
        {/* Rims list TAB */}
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <SearchInput />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              overflow: "hidden",
              minHeight: 0,
            }}
          >
            {/* TODO: Make this possible */}
            {/* <DataTable sx={{ mt: "12px", flexGrow: 1 }} type="goods/tires" /> */}
            <DataTable sx={{ mt: "12px", flexGrow: 1 }} type="services" />
          </Box>
        </Box>
        {/* Car Batteries list TAB */}
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <SearchInput />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              overflow: "hidden",
              minHeight: 0,
            }}
          >
            {/* TODO: Make this possible */}
            {/* <DataTable sx={{ mt: "12px", flexGrow: 1 }} type="goods/tires" /> */}
            <DataTable sx={{ mt: "12px", flexGrow: 1 }} type="services" />
          </Box>
        </Box>
        {/* Analytics TAB */}
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
