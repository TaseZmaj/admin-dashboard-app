import {
  Box,
  Fade,
  FormControlLabel,
  Switch,
  SxProps,
  TablePagination,
  TableSortLabel,
  Tooltip,
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
import { DataTableItem } from "../../utils/Types/modelTypes.ts";
import { useEffect, useMemo, useState } from "react";
import { visuallyHidden } from "@mui/utils";
import Loading from "../Loading.tsx";
import { TopBarHeight } from "../../utils/UiVariables.ts";
import ErrorBox from "../ErrorBox.tsx";
import { formatPrice, snakeCaseToNormal } from "../../utils/stringUtils.ts";
import useResolvedMode from "../../hooks/useResolvedMode.ts";
import { ErrorType } from "../../utils/Types/utilTypes.ts";
import useTableData from "../../hooks/useTableData.ts";
import SearchInput from "../topbar/SearchInput.tsx";

interface TableProps {
  type: DataTableType;
  includeSearch?: boolean;
  sx?: SxProps;
}

// MUI Data Table functions and types
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

// Style vars
const goodsHeadings = ["id", "name", "type", "brand", "stock", "sales_price"];
const serviceHeadings = [
  "id",
  "name",
  "type",
  "sales_price",
  "price_without_tax",
  "cost",
];

const tableHeadings: Record<DataTableType, string[]> = {
  goods: goodsHeadings,
  "goods/tires": goodsHeadings,
  "goods/rims": goodsHeadings,
  "goods/car_batteries": goodsHeadings,
  services: serviceHeadings,
  "services/tires": serviceHeadings,
  "services/undercarriage_repair": serviceHeadings,
  "services/oil_filter_change": serviceHeadings,
  "services/car_battery": serviceHeadings,
  "services/auto_ac": serviceHeadings,
  employees: ["id", "name"],
  "employees/salespersons": ["id", "name"],
  "employees/servicemen": ["id", "name"],
  "sales-channels": ["id", "name"],
  customers: ["id", "name"],
  orders: [],
  reviews: [],
};

const goodsTableHeadingSizes = {
  id: "10%",
  name: "40%",
  brand: "10%",
  type: "13.34%",
  stock: "13.34%",
  price: "13.34%",
};

const servicesTableHeadingSizes = {
  id: "10%",
  name: "40%",
  type: "20%",
  sales_price: "10%",
  price_without_tax: "10%",
  cost: "10%",
};

const tableHeadingSizes = {
  goods: goodsTableHeadingSizes,
  "goods/tires": goodsTableHeadingSizes,
  "goods/rims": goodsTableHeadingSizes,
  "goods/car_batteries": goodsTableHeadingSizes,
  services: servicesTableHeadingSizes,
  "services/tires": servicesTableHeadingSizes,
  "services/undercarriage_repair": servicesTableHeadingSizes,
  "services/oil_filter_change": servicesTableHeadingSizes,
  "services/car_battery": servicesTableHeadingSizes,
  "services/auto_ac": servicesTableHeadingSizes,
};

export default function DataTable({ type, includeSearch, sx }: TableProps) {
  const { data, loading, error, fetchItems, fetchItem } = useTableData(type);

  // // Search input state
  const [query, setQuery] = useState("");

  // Table data state
  const [tableData, setTableData] = useState<typeof data>([]);
  const [tableError, setTableError] = useState<ErrorType | null>(null);
  const [tableItemsLoading, setTableItemsLoading] = useState<Boolean>(false);

  const resolvedMode = useResolvedMode();
  const { palette } = useTheme() as Theme;

  const headings = tableHeadings[type];

  //MUI table state
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof DataTableItem>("id");

  //MUI table variables
  const visibleRows = useMemo(() => {
    if (!tableData) return [];
    return [...tableData]
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [tableData, order, orderBy, page, rowsPerPage]);

  //MUI table handlers
  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof DataTableItem
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
    (property: keyof DataTableItem) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  //Sync with the global good context
  useEffect(() => {
    setTableData(data);
    setTableError(error);
    setTableItemsLoading(loading);
  }, [data, error, loading]);

  useEffect(() => {
    fetchItems();
  }, []);

  //For filtering by name
  useEffect(() => {
    setTableData(
      data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);

  //TODO: Import these for cusotmers as metrics calculated in the cards:
  //Loyalty/Value Metrics (often derived, but can be stored for quick access)
  // 1. total_spent NUMERIC(18,2): Aggregate of all money spent by the customer.
  // 2. lifetime_orders INTEGER: Total number of orders placed.
  // 3. last_order_date DATE: Date of the most recent order.

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {includeSearch ? (
          <SearchInput query={query} setQuery={setQuery} />
        ) : null}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* The Paper and everything below is the Data Table */}
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: palette.background.default,
            border: `1px solid ${palette.divider}`,
            overflow: "hidden",
            height: `calc(100vh - ${TopBarHeight}px - 175px )`,
            minHeight: 0,
            mt: "12px",
            flexGrow: 1,
            ...sx,
          }}
          elevation={1}
        >
          <TableContainer
            sx={{
              overflowX: "auto",
              overflowY: "auto",
              scrollbarGutter: "stable",
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
                        onClick={createSortHandler(
                          heading as keyof DataTableItem
                        )}
                      >
                        {snakeCaseToNormal(heading)}
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
              <TableBody>
                {tableError && !tableData && !tableItemsLoading ? (
                  <TableRow key="error">
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
                        <ErrorBox tryAgainFunc={fetchItems}>
                          There was a problem while trying to establish a
                          connection to the database...
                        </ErrorBox>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : null}
                {tableItemsLoading ? (
                  <>
                    <TableRow key="tableItemsLoading">
                      <TableCell colSpan={6} sx={{ border: 0, height: "100%" }}>
                        <Box
                          sx={{
                            width: "100%",
                            height: `calc(100vh - ${TopBarHeight}px - 350px)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Loading size={60} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </>
                ) : null}
                {tableData && !tableError && !tableItemsLoading
                  ? visibleRows.map((tableItem, i) => (
                      <Tooltip
                        arrow
                        key={i}
                        placement="top"
                        title={`Click for more info about ${tableItem.name}...`}
                        slots={{
                          transition: Fade,
                        }}
                        slotProps={{
                          transition: { timeout: 500 },
                        }}
                        enterDelay={700}
                        leaveDelay={100}
                      >
                        <TableRow
                          onClick={() => fetchItem(tableItem.id)}
                          sx={{
                            // "&:last-child td, &:last-child th": { border: 0 },
                            height: !dense ? "59.8px" : undefined,
                            transition: "all 0.22s ease-out",
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor:
                                resolvedMode === "light"
                                  ? `${palette.primary.light}`
                                  : `${palette.divider}`,
                            },
                          }}
                        >
                          {type.startsWith("goods") ? (
                            <>
                              <TableCell component="th" scope="row">
                                {tableItem.id}
                              </TableCell>
                              <TableCell align="left">
                                {tableItem.name}&nbsp;{tableItem?.diameter}
                                {tableItem.diameter ? <span>"</span> : null}
                              </TableCell>
                              <TableCell align="left">
                                {tableItem.type}
                              </TableCell>
                              <TableCell align="left">
                                {tableItem.brand}
                              </TableCell>
                              <TableCell align="left">
                                {tableItem.stock}
                              </TableCell>
                              <TableCell align="left">
                                {formatPrice(tableItem.sales_price)} MKD
                              </TableCell>
                            </>
                          ) : null}
                          {type.startsWith("services") ? (
                            <>
                              <TableCell component="th" scope="row">
                                {tableItem.id}
                              </TableCell>
                              <TableCell align="left">
                                {tableItem.name}
                              </TableCell>
                              <TableCell align="left">
                                {tableItem.type}
                              </TableCell>
                              <TableCell align="left">
                                {formatPrice(tableItem.sales_price)} MKD
                              </TableCell>
                              <TableCell align="left">
                                {formatPrice(tableItem.price_without_tax)} MKD
                              </TableCell>
                              <TableCell>
                                {formatPrice(tableItem.cost)} MKD
                              </TableCell>
                            </>
                          ) : null}
                          {type.startsWith("employees") ? <></> : null}
                        </TableRow>
                      </Tooltip>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              borderTop: `1px solid ${palette.divider}`,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: "auto",
            }}
          >
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={tableData ? tableData.length : 0}
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
      </Box>
    </Box>
  );
}
