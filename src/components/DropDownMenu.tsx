import {
  FormControl,
  MenuItem,
  Select,
  useTheme,
  SxProps,
  SelectChangeEvent,
  Theme,
} from "@mui/material";
import { useState } from "react";

interface DropDownMenuProps {
  sx?: SxProps;
  size?: "small" | "medium";
  type: "timeFilter";
}

export default function DropDownMenu({
  sx = {},
  size = "medium",
  type = "timeFilter",
}: DropDownMenuProps) {
  const [selectState, setSelectState] = useState("week");
  const { palette } = useTheme<Theme>();

  function handleChange(e: SelectChangeEvent) {
    setSelectState(e.target.value);
  }

  return (
    <>
      {type === "timeFilter" ? (
        <FormControl size={size} sx={{ ...sx, minWidth: "137px" }}>
          <Select
            onChange={handleChange}
            variant="outlined"
            value={selectState}
            MenuProps={{
              PaperProps: {
                variant: "outlined",
                elevation: 6,
                sx: {
                  backgroundColor: palette.background.paper,
                },
              },
              MenuListProps: {
                sx: {
                  padding: 0,
                },
              },
            }}
          >
            <MenuItem sx={{ borderRadius: "4px" }} value={"week"}>
              Weekly
            </MenuItem>
            <MenuItem sx={{ borderRadius: "4px" }} value={"month"}>
              Monthly
            </MenuItem>
            <MenuItem sx={{ borderRadius: "4px" }} value={"year"}>
              Yearly
            </MenuItem>
            <MenuItem sx={{ borderRadius: "4px" }} value={"2years"}>
              Last 2 Years
            </MenuItem>
          </Select>
        </FormControl>
      ) : null}
    </>
  );
}
