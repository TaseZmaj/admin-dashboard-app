import { Box } from "@mui/material";
import WelcomeMsg from "../../components/presentational/WelcomeMsg";
import FiltersGroup from "../../components/FiltersGroup";

export default function Homepage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        mb: "7px",
        minHeight: "51px",
        alignItems: "center",
      }}
    >
      <WelcomeMsg />
      <FiltersGroup includeFilters={["AllTimeBtn", "TimeFilter"]} />
    </Box>
  );
}
