import { Box, CircularProgress, SxProps } from "@mui/material";

export default function Loading({ size, sx }: { size: number; sx: SxProps }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress
        sx={{ ...sx }}
        thickness={4.5}
        size={size === undefined ? 50 : size}
      />
    </Box>
  );
}
