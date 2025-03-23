import { AppBar, TextField, Toolbar, useColorScheme } from "@mui/material";
import { Theme, useTheme } from "@mui/material";
import ColorModeToggle from "../Util/ColorModeToggle";
import FormInput from "../Login/FormInput";

export default function TopBar() {
  const { palette } = useTheme() as Theme;
  const { mode } = useColorScheme();

  return (
    <AppBar
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "83px",
        height: "83px",
        boxSizing: "border-box",
        p: "10px",
        backgroundColor:
          mode === "light"
            ? palette.background.default
            : palette.background.paper,
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        position: "relative",
      }}
      position="static"
      variant="outlined"
    >
      <Toolbar>
        {/* TODO: Maybe make the FormInput component be able to be either a 
      TextField or a FormInput so that it can be integrated into the AppBar */}

        <TextField
          sx={{ width: "300px", mr: "10px" }}
          variant="outlined"
          label="Search..."
          size="small"
        ></TextField>

        <FormInput variant="filled" sx={{ width: "200px" }} />

        <ColorModeToggle
          size="small"
          sx={{ position: "absolute", right: 25 }}
          glow={false}
        />
      </Toolbar>
    </AppBar>
  );
}
