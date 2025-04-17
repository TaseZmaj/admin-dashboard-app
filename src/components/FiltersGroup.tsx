import { Box, Button, SxProps, Theme, useTheme } from "@mui/material";
import { FilterGroups } from "../utils/customTypes";
import DropDownMenu from "./DropDownMenu";
import useResolvedMode from "../hooks/useResolvedMode";

interface FiltersGroupProps {
  sx?: SxProps;
  includeFilters: [FilterGroups, ...FilterGroups[]];
}

// TODO: Add a sort filter
// TODO: ADD A TYPE OF GOODS FILTER - Tire, Car battery

export default function FiltersGroup({
  sx = {},
  includeFilters,
}: FiltersGroupProps) {
  const resolvedMode = useResolvedMode();
  const { palette } = useTheme() as Theme;

  return (
    <Box
      sx={{
        ml: "auto",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        ...sx,
      }}
    >
      {includeFilters.includes("TimeFilter") ? (
        <DropDownMenu size="small" type="timeFilter" sx={{ width: "100px" }} />
      ) : null}
      {includeFilters.includes("AllTimeBtn") ? (
        <Button
          variant={resolvedMode === "light" ? "contained" : "outlined"}
          disableElevation
          sx={{
            minHeight: "40px",
            color: resolvedMode === "light" ? palette.common.white : null,
            textTransform: "none",
            pt: "8px",
            backgroundColor:
              resolvedMode === "light" ? palette.grey[900] : null,
          }}
        >
          View All Time
        </Button>
      ) : null}
    </Box>
  );
}
