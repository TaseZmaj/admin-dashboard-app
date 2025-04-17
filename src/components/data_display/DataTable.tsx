import { SxProps, useTheme } from "@mui/material";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Theme,
} from "@mui/material";
import useResolvedMode from "../../hooks/useResolvedMode.ts";
import { DataTableType } from "../../utils/customTypes.ts";

interface TableProps {
  type: DataTableType;
  sx?: SxProps;
}

const tableHeadings = {
  goods: ["#", "Name", "Type", "Brand", "Stock", "Price"],
  services: ["#", "Name", "Type", "Price"],
  employees: [],
  "sales-channels": [],
  customers: [],
  orders: [],
  reviews: [],
};

export default function DataTable({ type, sx = {} }: TableProps) {
  const { palette } = useTheme() as Theme;
  const resolvedMode = useResolvedMode();

  const headings = tableHeadings[type];

  return (
    <TableContainer
      component={Paper}
      elevation={1}
      sx={{
        backgroundColor: palette.background.default,
        border: resolvedMode === "dark" ? `1px solid ${palette.divider}` : "",
        ...sx,
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headings.map((heading) => (
              <TableCell
                align="left"
                key={heading}
                sx={{ width: heading === "#" ? "25px" : null }}
              >
                {heading}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            // <TableRow
            //   key={row.name}
            //   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            // >
            //   <TableCell component="th" scope="row">
            //     {row.name}
            //   </TableCell>
            //   <TableCell align="right">{row.calories}</TableCell>
            //   <TableCell align="right">{row.fat}</TableCell>
            //   <TableCell align="right">{row.carbs}</TableCell>
            //   <TableCell align="right">{row.protein}</TableCell>
            // </TableRow>
          ))} */}
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
