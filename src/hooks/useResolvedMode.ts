import { useColorScheme } from "@mui/material";

// Returns the current theme (Color mode) the user has selected
export default function useResolvedMode() {
  const { mode, systemMode } = useColorScheme();
  return (systemMode || mode) as "light" | "dark";
}
