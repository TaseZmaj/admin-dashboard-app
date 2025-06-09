import { CircularProgress, SxProps } from "@mui/material";

export default function Loading({ size, sx }: { size: number; sx?: SxProps }) {
  return (
    <CircularProgress
      sx={{ ...sx }}
      thickness={4.5}
      size={size === undefined ? 50 : size}
    />
  );
}
