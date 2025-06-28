import {
  Avatar,
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
import {
  DataTableItem,
  Employee,
  Order,
  Review,
  Product,
  SalesChannel,
  Service,
  Customer,
} from "../../utils/Types/modelTypes.ts";
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
import { tableHeadings, tableHeadingSizes } from "../../utils/UiVariables.ts";

//Images
import maleWorkerAvatar from "../../assets/avatars/maleWorkerAvatar.png";
import MaleServiceman1 from "../../assets/avatars/MaleServicemen1.png";
import MaleServiceman2 from "../../assets/avatars/MaleServicemen2.png";
import FemaleSalesPerson from "../../assets/avatars/FemaleSalesPerson.png";
import MaleSalesPerson from "../../assets/avatars/MaleSalesPerson.png";

interface TableProps {
  type: DataTableType;
  includeSearch?: boolean;
  sx?: SxProps;
}

// MUI Data Table functions and types
type LocalOrder = "asc" | "desc";

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
  order: LocalOrder,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

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
  const [order, setOrder] = useState<LocalOrder>("asc");
  const [orderBy, setOrderBy] = useState<keyof DataTableItem>("id");

  //For adjusting the table column widths
  const tableType =
    type.indexOf("/") !== -1
      ? (type.slice(0, type.indexOf("/")) as keyof typeof tableHeadingSizes)
      : type;

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

  //Fetch items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  //For filtering by name
  //TODO: Write a better query function, where it parses the string at each " ",
  //and looks for the words individually
  //TODO: Adjust the query for the customers tab because some of them dont
  //have a name
  useEffect(() => {
    setTableData(
      data.filter((item) =>
        item?.name?.toLowerCase().includes(query.toLowerCase())
      ) as typeof data
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
                          tableHeadingSizes[tableType][
                            heading as keyof (typeof tableHeadingSizes)[typeof tableType]
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
                        {heading === "id" ? "ID" : snakeCaseToNormal(heading)}
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
                {tableError && !tableItemsLoading ? (
                  <TableRow key="error">
                    <TableCell
                      colSpan={headings.length}
                      sx={{
                        border: 0,
                        height: "100%" /*"561px"*/,
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: `calc(100vh - ${TopBarHeight}px - 350px)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ErrorBox tryAgainFunc={fetchItems}>
                          {tableError}
                        </ErrorBox>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : null}
                {tableItemsLoading && !tableError ? (
                  <>
                    <TableRow key="tableItemsLoading">
                      <TableCell
                        colSpan={headings.length}
                        sx={{ border: 0, height: "100%" }}
                      >
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
                                {tableItem.name}&nbsp;
                                {(tableItem as Product)?.diameter}
                                {(tableItem as Product).diameter ? (
                                  <span>"</span>
                                ) : null}
                              </TableCell>
                              <TableCell align="left">
                                {tableItem.type}
                              </TableCell>
                              <TableCell align="left">
                                {(tableItem as Product).brand}
                              </TableCell>
                              <TableCell align="left">
                                {(tableItem as Product).stock}
                              </TableCell>
                              <TableCell align="left">
                                {formatPrice(
                                  (tableItem as Product)?.sales_price
                                )}
                                MKD
                              </TableCell>
                              <TableCell align="left">
                                {formatPrice(
                                  (tableItem as Product).price_without_tax
                                )}
                                MKD
                              </TableCell>
                              <TableCell>
                                {formatPrice((tableItem as Product).cost)} MKD
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
                                {formatPrice(
                                  (tableItem as Service).sales_price
                                )}{" "}
                                MKD
                              </TableCell>
                              <TableCell align="left">
                                {formatPrice(
                                  (tableItem as Service).price_without_tax
                                )}{" "}
                                MKD
                              </TableCell>
                              <TableCell>
                                {formatPrice((tableItem as Service).cost)} MKD
                              </TableCell>
                            </>
                          ) : null}
                          {type.startsWith("employees") ? (
                            <>
                              <TableCell component="th" scope="row">
                                {tableItem.id}
                              </TableCell>
                              <TableCell align="left" sx={{ padding: "2px" }}>
                                {(tableItem as Employee).gender == "Male" &&
                                tableItem.type === "Serviceman" ? (
                                  <Avatar
                                    src={MaleServiceman1}
                                    alt="Male serviceman avatar"
                                  ></Avatar>
                                ) : null}
                                {(tableItem as Employee).gender == "Male" &&
                                tableItem.type === "Salesperson" ? (
                                  <Avatar
                                    src={MaleSalesPerson}
                                    alt="Male salesperson avatar"
                                  ></Avatar>
                                ) : null}
                                {(tableItem as Employee).gender == "Female" &&
                                tableItem.type === "Salesperson" ? (
                                  <Avatar
                                    src={FemaleSalesPerson}
                                    alt="Female salesperson avatar"
                                  ></Avatar>
                                ) : null}
                                {/* This is for a female serviceman */}
                                {/* {tableItem.gender === "female" &&
                                tableItem.type === "Serviceman" ? (
                                  <img
                                    src={maleWorkerAvatar}
                                    alt="Female serviceman avatar"
                                  ></img>
                                ) : null} */}
                              </TableCell>
                              <TableCell align="left">
                                {tableItem.name}
                              </TableCell>
                              <TableCell align="left">
                                {tableItem.type}
                              </TableCell>
                              <TableCell align="left">
                                {(tableItem as Employee).email}
                              </TableCell>
                              <TableCell align="left">
                                {(tableItem as Employee).job_title}
                              </TableCell>
                              <TableCell>
                                {(tableItem as Employee).is_active
                                  ? "YES"
                                  : "NO"}
                              </TableCell>
                              <TableCell>
                                {(tableItem as Employee).employment_status}
                              </TableCell>
                              <TableCell>
                                {formatPrice((tableItem as Employee).salary)}
                                MKD
                              </TableCell>
                            </>
                          ) : null}
                          {type.startsWith("salesChannels") ? (
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
                                {(tableItem as SalesChannel).address}
                              </TableCell>
                              <TableCell align="left">
                                {(tableItem as SalesChannel).is_active
                                  ? "Yes"
                                  : "No"}
                              </TableCell>
                              <TableCell align="left">
                                {(
                                  tableItem as SalesChannel
                                ).start_date?.toDateString()}
                              </TableCell>
                              <TableCell align="left">
                                {(tableItem as SalesChannel).endDate
                                  ? (
                                      tableItem as SalesChannel
                                    ).endDate?.toDateString()
                                  : "N/A"}
                              </TableCell>
                            </>
                          ) : null}
                          {type.startsWith("customers") ? (
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
                                {(tableItem as Customer).email}
                              </TableCell>
                              <TableCell align="left">
                                {(tableItem as Customer).phone_number}
                              </TableCell>
                              <TableCell align="left">
                                {(tableItem as Customer).alt_phone_number}
                              </TableCell>
                            </>
                          ) : null}
                          {/* NOTE: Order and Review types return an error because they are not 
                          handeled in the useDataTable hook yet, fix that, and they will work */}
                          {type.startsWith("orders") ? (
                            <>
                              <TableCell component="th" scope="row">
                                {tableItem.id}
                              </TableCell>
                              <TableCell align="left">
                                {tableItem.type}
                              </TableCell>
                              <TableCell align="left">
                                {tableItem.customer_id}
                              </TableCell>
                              <TableCell align="left">
                                {tableItem.salesperson_id}
                              </TableCell>
                              <TableCell align="left">
                                {tableItem.delivery_status_type}
                              </TableCell>
                              <TableCell align="left">
                                {new Date(
                                  tableItem.order_date
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell align="left">
                                {formatPrice(tableItem.shipping_cost)} MKD
                              </TableCell>
                            </>
                          ) : null}
                          {type.startsWith("reviews") ? (
                            <>
                              <TableCell component="th" scope="row">
                                {tableItem.id}
                              </TableCell>
                              <TableCell align="left">
                                {tableItem.type}
                              </TableCell>
                              <TableCell align="left">
                                {tableItem.customer_id}
                              </TableCell>
                              <TableCell align="left">
                                {tableItem.rating}
                              </TableCell>
                              <TableCell align="left">
                                {/* This logic might need refinement based on how you link good/service/sales_channel for display */}
                                {tableItem.good_id ||
                                tableItem.service_id ||
                                tableItem.sales_channel_id
                                  ? "Reviewed Item"
                                  : "N/A"}
                              </TableCell>
                            </>
                          ) : null}
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
