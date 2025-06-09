import {
  Box,
  capitalize,
  FormControlLabel,
  Switch,
  SxProps,
  TablePagination,
  TableSortLabel,
  useTheme,
} from "@mui/material";
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
import { DataTableType } from "../../utils/Types/utilTypes.ts";
import { Product } from "../../utils/Types/modelTypes.ts";
import { useEffect, useMemo, useState } from "react";
import useGoods from "../../hooks/useGoods.ts";
import { visuallyHidden } from "@mui/utils";
import { DataTableSchemaMap } from "../../utils/Types/utilTypes.ts";
import Loading from "../Loading.tsx";

interface TableProps {
  type: DataTableType;
  sx?: SxProps;
}

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const tableHeadings: {
  [K in keyof DataTableSchemaMap]: (keyof DataTableSchemaMap[K])[];
} = {
  goods: ["id", "name", "type", "brand", "stock", "price"],
  services: ["id", "name", "type"],
  employees: ["id", "name"],
  "sales-channels": ["id", "name"],
  customers: ["id", "name"],
  orders: [],
  reviews: [],
};

const tableHeadingSizes = {
  goods: {
    id: "10%",
    name: "40%",
    brand: "20%",
    type: "10%",
    stock: "10%",
    price: "10%",
  },
  services: {
    id: "10%",
  },
};

const TopBarHeight = 83;

export default function DataTable({ type, sx = {} }: TableProps) {
  const { getProductsList, products, isLoading } = useGoods();
  // const [items, setItems] = useState(null);

  const { palette } = useTheme() as Theme;

  const headings = tableHeadings[type];

  //MUI table state
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Product>("id");

  //MUI table handlers
  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Product
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };
  const createSortHandler =
    (property: keyof Product) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  //MUI table variables
  // const emptyRows =
  //   products && page > 0
  //     ? Math.max(0, (1 + page) * rowsPerPage - products.length)
  //     : 0;
  const visibleRows = useMemo(() => {
    if (!products) return [];
    return [...products]
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [products, order, orderBy, page, rowsPerPage]);

  useEffect(() => {
    switch (type) {
      case "goods":
        getProductsList();
        // if (products) {
        //    setItems(products);
        // }
        break;
      case "services":
        break;
      case "employees":
        break;
      case "sales-channels":
        break;
      case "customers":
        break;
      case "orders":
        break;
      case "reviews":
        break;
      default:
        throw new Error("ERROR: Invalid data table type!");
    }
  }, []);

  // TODO: Make the footer of the table be visible on zooming in!!!

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: palette.background.default,
        border: `1px solid ${palette.divider}`,
        overflow: "hidden",
        ...sx,
        height: `calc(100vh - ${TopBarHeight}px - 175px )`,
        minHeight: 0,
      }}
      elevation={1}
    >
      <TableContainer
        sx={{
          overflowX: "auto",
          overflowY: "auto",
        }}
      >
        <Table stickyHeader size={dense ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              {headings.map((heading: string) => (
                <TableCell
                  variant="head"
                  key={heading}
                  sx={{
                    width:
                      tableHeadingSizes.goods[
                        heading as keyof typeof tableHeadingSizes.goods
                      ],
                  }}
                  sortDirection={orderBy === heading ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === heading}
                    direction={orderBy === heading ? order : "asc"}
                    onClick={createSortHandler(heading as keyof Product)}
                  >
                    {capitalize(heading)}
                    {orderBy === heading ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} sx={{ border: 0, height: "561px" }}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Loading size={60} />
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            <TableBody>
              {!isLoading && type === "goods" && products
                ? visibleRows.map((product, i) => (
                    <TableRow
                      key={i}
                      sx={{
                        // "&:last-child td, &:last-child th": { border: 0 },
                        height: !dense ? "59.8px" : undefined,
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {product.id}
                      </TableCell>
                      <TableCell align="left">{product.name}</TableCell>
                      <TableCell align="left">{product.type}</TableCell>
                      <TableCell align="left">{product.brand}</TableCell>
                      <TableCell align="left">{product.stock}</TableCell>
                      <TableCell align="left">null</TableCell>
                    </TableRow>
                  ))
                : null}
              {/* {type === "services" && services ? services.map() .  .  .} */}
              {/* {emptyRows > 0 && (
              <TableRow sx={{ height: !dense ? "59px" : undefined }}>
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <Box
        sx={{
          borderTop: `1px solid ${palette.divider}`,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          // flexShrink: 0,
          // position: "sticky",
          // zIndex: 20,
          // bottom: 0,
          marginTop: "auto",
        }}
      >
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={products ? products.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ order: 1 }}
        />
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense"
        />
      </Box>
    </Paper>
  );
}
