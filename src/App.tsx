import { BrowserRouter, Routes, Route } from "react-router";
import { Suspense, lazy } from "react";

import AuthProvider from "./contexts/AuthContext.tsx";
import ErrorProvider from "./contexts/ErrorContext.tsx";

import AppTheme from "./theme/AppTheme.tsx";

const Homepage = lazy(() => import("./pages/MainPages/Homepage.tsx"));
const Goods = lazy(() => import("./pages/MainPages/Goods.tsx"));
const Services = lazy(() => import("./pages/MainPages/Services.tsx"));
const Employees = lazy(() => import("./pages/MainPages/Employees.tsx"));
const SalesChannels = lazy(() => import("./pages/MainPages/SalesChannels.tsx"));
const Customers = lazy(() => import("./pages/MainPages/Customers.tsx"));
const Orders = lazy(() => import("./pages/MainPages/Orders.tsx"));
const Compare = lazy(() => import("./pages/MainPages/Compare.tsx"));
const Login = lazy(() => import("./pages/MainPages/Login.tsx"));
const Error = lazy(() => import("./pages/MainPages/Error.tsx"));
import Loading from "./components/Static/Loading.tsx";
import ProtectedRoute from "./pages/MainPages/ProtectedRoute.tsx";

const SingleGood = lazy(() => import("./pages/DynamicPages/SingleGood.tsx"));
const SingleService = lazy(
  () => import("./pages/DynamicPages/SingleService.tsx")
);
const SingleSalesPerson = lazy(
  () => import("./pages/DynamicPages/SingleSalesPerson.tsx")
);
const SingleSalesChannel = lazy(
  () => import("./pages/DynamicPages/SingleSalesChannel.tsx")
);
const SingleCustomer = lazy(
  () => import("./pages/DynamicPages/SingleCustomer.tsx")
);
const SingleOrder = lazy(() => import("./pages/DynamicPages/SingleOrder.tsx"));

export default function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppTheme>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route
                  index
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Homepage />
                    </ProtectedRoute>
                  }
                ></Route>

                <Route
                  path="goods"
                  element={
                    <ProtectedRoute>
                      <Goods />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="services"
                  element={
                    <ProtectedRoute>
                      <Services />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="employees"
                  element={
                    <ProtectedRoute>
                      <Employees />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="sales-channels"
                  element={
                    <ProtectedRoute>
                      <SalesChannels />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="customers"
                  element={
                    <ProtectedRoute>
                      <Customers />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="orders"
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  }
                ></Route>

                <Route
                  path="goods/:goodId"
                  element={
                    <ProtectedRoute>
                      <SingleGood />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="services/:serviceId"
                  element={
                    <ProtectedRoute>
                      <SingleService />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="customers/:customerId"
                  element={
                    <ProtectedRoute>
                      <SingleCustomer />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="order/:orderId"
                  element={
                    <ProtectedRoute>
                      <SingleOrder />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="sales-channels/:salesChannelId"
                  element={
                    <ProtectedRoute>
                      <SingleSalesChannel />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="salesperson/:salesPersonId"
                  element={
                    <ProtectedRoute>
                      <SingleSalesPerson />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="compare"
                  element={
                    <ProtectedRoute>
                      <Compare />
                    </ProtectedRoute>
                  }
                />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </Suspense>
          </AppTheme>
        </BrowserRouter>
      </AuthProvider>
    </ErrorProvider>
  );
}
