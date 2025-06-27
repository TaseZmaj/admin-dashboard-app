import { BrowserRouter, Routes, Route } from "react-router";
import { Suspense, lazy } from "react";

import AuthProvider from "./contexts/AuthContext.tsx";
import ErrorProvider from "./contexts/ErrorContext.tsx";

import AppTheme from "./theme/AppTheme.tsx";

import { Box } from "@mui/material";

import GoodsProvider from "./contexts/GoodsContext.tsx";
import ServicesProvider from "./contexts/ServicesContext.tsx";
import EmployeesProvider from "./contexts/EmployeesContext.tsx";
import CustomersProvider from "./contexts/CustomersContext.tsx";
import OrdersProvider from "./contexts/OrdersContext.tsx";
import ReviewsProvider from "./contexts/ReviewsContext.tsx";

import SalesChannelsProvider from "./contexts/SalesChannelsContext.tsx";

const Homepage = lazy(() => import("./pages/protected/Homepage.tsx"));
const Goods = lazy(() => import("./pages/protected/Goods.tsx"));
const Services = lazy(() => import("./pages/protected/Services.tsx"));
const Employees = lazy(() => import("./pages/protected/Employees.tsx"));
const SalesChannels = lazy(() => import("./pages/protected/SalesChannels.tsx"));
const Customers = lazy(() => import("./pages/protected/Customers.tsx"));
const Orders = lazy(() => import("./pages/protected/Orders.tsx"));
const Compare = lazy(() => import("./pages/protected/Compare.tsx"));
const Login = lazy(() => import("./pages/publicPages/Login.tsx"));
const Error = lazy(() => import("./pages/publicPages/Error.tsx"));
const Reviews = lazy(() => import("./pages/protected/Reviews.tsx"));

const Loading = lazy(() => import("./components/Loading.tsx"));
const ProtectedRoute = lazy(
  () => import("./pages/utilPages/ProtectedRoute.tsx")
);
const Layout = lazy(() => import("./pages/utilPages/Layout.tsx"));

const SingleGood = lazy(
  () => import("./pages/protected/dynamicPages/SingleGood.tsx")
);
const SingleService = lazy(
  () => import("./pages/protected/dynamicPages/SingleService.tsx")
);
const SingleSalesPerson = lazy(
  () => import("./pages/protected/dynamicPages/SingleSalesPerson.tsx")
);
const SingleSalesChannel = lazy(
  () => import("./pages/protected/dynamicPages/SingleSalesChannel.tsx")
);
const SingleCustomer = lazy(
  () => import("./pages/protected/dynamicPages/SingleCustomer.tsx")
);
const SingleOrder = lazy(
  () => import("./pages/protected/dynamicPages/SingleOrder.tsx")
);

export default function App() {
  // TODO: Add a refresh button at the Pages to fetch the newest data

  //TODO: Mobile Responsive NavBar

  //TODO: Hamburger menu Navbar toggle
  //TODO:  Create a higher level state for the drawer to open
  //--> Navbar toggle opcija na tablet + backdrop dimmed koga
  //ke e uklucen
  {
    // TODO: Add another account with firebase via POST method in the "+Account page" 🤔
    // TODO: Implement firebase for the admin user and the company data
    // IMPORTANT: Make a separate git branch for this so as to not confilct with the already coded AuthContext.
    // If it doesn't work out, you can revert the changes
    //TODO: Make the functionality for the notifications icon button dropdown menu - with firebase
  }
  // TODO: Make style overrides in the theme for:
  //-> Make the color theme dropdown menu items have prettier colors on hover and selected

  // TODO: Create a toggle for the glowing effects in a new Settings page under UI section 🤔

  // TODO: Make a settings page and implement it at the navbar for customizing: 1.Users and the 2.UI of the Dashboard
  //-> The state for the UI (eg. Glow effects) can live inside the AppTheme context maybe?

  //TODO: Dim the colors in the SideNavBar menu Dividers

  return (
    <ErrorProvider>
      <AuthProvider>
        <GoodsProvider>
          <ServicesProvider>
            <EmployeesProvider>
              <SalesChannelsProvider>
                <CustomersProvider>
                  <OrdersProvider>
                    <ReviewsProvider>
                      <BrowserRouter>
                        <AppTheme>
                          <Suspense
                            fallback={
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
                            }
                          >
                            <Routes>
                              {/* Public routes */}
                              <Route path="login" element={<Login />} />

                              {/* Protected Routes */}
                              <Route
                                element={
                                  <ProtectedRoute>
                                    <Layout />
                                  </ProtectedRoute>
                                }
                              >
                                <Route
                                  index
                                  path="/"
                                  element={<Homepage />}
                                ></Route>
                                <Route path="goods" element={<Goods />}></Route>
                                <Route
                                  path="services"
                                  element={<Services />}
                                ></Route>
                                <Route
                                  path="employees"
                                  element={<Employees />}
                                ></Route>
                                <Route
                                  path="sales-channels"
                                  element={<SalesChannels />}
                                ></Route>
                                <Route
                                  path="customers"
                                  element={<Customers />}
                                ></Route>
                                <Route
                                  path="orders"
                                  element={<Orders />}
                                ></Route>
                                <Route
                                  path="reviews"
                                  element={<Reviews />}
                                ></Route>
                                <Route
                                  path="compare"
                                  element={<Compare />}
                                ></Route>
                                <Route path="*" element={<Error />} />

                                {/* Dynamic Routes */}
                                <Route
                                  path="goods/:goodId"
                                  element={<SingleGood />}
                                />
                                <Route
                                  path="services/:serviceId"
                                  element={<SingleService />}
                                />
                                <Route
                                  path="customers/:customerId"
                                  element={<SingleCustomer />}
                                />
                                <Route
                                  path="order/:orderId"
                                  element={<SingleOrder />}
                                />
                                <Route
                                  path="sales-channels/:salesChannelId"
                                  element={<SingleSalesChannel />}
                                />
                                <Route
                                  path="salesperson/:salesPersonId"
                                  element={<SingleSalesPerson />}
                                />
                              </Route>
                            </Routes>
                          </Suspense>
                        </AppTheme>
                      </BrowserRouter>
                    </ReviewsProvider>
                  </OrdersProvider>
                </CustomersProvider>
              </SalesChannelsProvider>
            </EmployeesProvider>
          </ServicesProvider>
        </GoodsProvider>
      </AuthProvider>
    </ErrorProvider>
  );
}
