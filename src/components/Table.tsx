import { Box } from "@mui/material";

interface TableProps {
  type: "goods" | "services";
}

// TODO: complete table, make it pretty 😊

export default function Table({ type }: TableProps) {
  return <>{type === "goods" ? <Box sx={{}}></Box> : null}</>;
}
