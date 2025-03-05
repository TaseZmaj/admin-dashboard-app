import { BrowserRouter, Routes, Route } from "react-router";
import { Suspense, lazy } from "react";

const Homepage = lazy(() => import("./pages/MainPages/Homepage.tsx"));
const Goods = lazy(() => import("./pages/MainPages/Goods.tsx"));
const Services = lazy(() => import("./pages/MainPages/Services.tsx"));
const Analytics = lazy(() => import("./pages/MainPages/Analytics.tsx"));
const SalesChannels = lazy(() => import("./pages/MainPages/SalesChannels.tsx"));
const Customers = lazy(() => import("./pages/MainPages/Customers.tsx"));
const Orders = lazy(() => import("./pages/MainPages/Orders.tsx"));
const Compare = lazy(() => import("./pages/MainPages/Compare.tsx"));
const Login = lazy(() => import("./pages/MainPages/Login.tsx"));
const Error = lazy(() => import("./pages/MainPages/Error.tsx"));
import Loading from "./pages/MainPages/Loading.tsx";

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
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route index path="/" element={<Homepage />}></Route>
          <Route path="goods" element={<Goods />}></Route>
          <Route path="services" element={<Services />}></Route>
          <Route path="analytics" element={<Analytics />}></Route>
          <Route path="sales-channels" element={<SalesChannels />}></Route>
          <Route path="customers" element={<Customers />}></Route>
          <Route path="orders" element={<Orders />}></Route>

          <Route path="goods/:goodId" element={<SingleGood />} />
          <Route path="services/:serviceId" element={<SingleService />} />
          <Route path="customers/:customerId" element={<SingleCustomer />} />
          <Route path="order/:orderId" element={<SingleOrder />}></Route>
          <Route
            path="sales-channels/:salesChannelId"
            element={<SingleSalesChannel />}
          />
          <Route
            path="salesperson/:salesPersonId"
            element={<SingleSalesPerson />}
          />

          <Route path="compare" element={<Compare />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
