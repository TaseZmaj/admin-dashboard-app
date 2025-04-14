import { useTheme, SxProps } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { InputAdornment, TextField, Theme } from "@mui/material";
import { useState } from "react";

interface SearchInputProps {
  sx?: SxProps;
}

export default function SearchInput({ sx = {} }: SearchInputProps) {
  const [focused, setFocused] = useState<Boolean>(false);
  const { palette } = useTheme() as Theme;

  return (
    <TextField
      sx={{ width: "300px", mr: "10px", transitionDuration: "150ms", ...sx }}
      variant="outlined"
      label="Search..."
      size="small"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon
                sx={{
                  color: focused ? palette.primary.main : "",
                  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                }}
              />
            </InputAdornment>
          ),
        },
      }}
    ></TextField>
  );
}
