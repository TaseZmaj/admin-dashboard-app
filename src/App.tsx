import { BrowserRouter, Routes, Route } from "react-router";
import { Suspense, lazy } from "react";

import AuthProvider from "./contexts/AuthContext.tsx";
import ErrorProvider from "./contexts/ErrorContext.tsx";

import AppTheme from "./theme/AppTheme.tsx";

const Homepage = lazy(() => import("./pages/Protected/Homepage.tsx"));
const Goods = lazy(() => import("./pages/Protected/Goods.tsx"));
const Services = lazy(() => import("./pages/Protected/Services.tsx"));
const Employees = lazy(() => import("./pages/Protected/Employees.tsx"));
const SalesChannels = lazy(() => import("./pages/Protected/SalesChannels.tsx"));
const Customers = lazy(() => import("./pages/Protected/Customers.tsx"));
const Orders = lazy(() => import("./pages/Protected/Orders.tsx"));
const Compare = lazy(() => import("./pages/Protected/Compare.tsx"));
const Login = lazy(() => import("./pages/PublicPages/Login.tsx"));
const Error = lazy(() => import("./pages/PublicPages/Error.tsx"));

// Make these lazy too?
const Loading = lazy(() => import("./components/Presentational/Loading.tsx"));
const ProtectedRoute = lazy(
  () => import("./pages/UtilPages/ProtectedRoute.tsx")
);
const Layout = lazy(() => import("./pages/UtilPages/Layout.tsx"));

const SingleGood = lazy(
  () => import("./pages/Protected/DynamicPages/SingleGood.tsx")
);
const SingleService = lazy(
  () => import("./pages/Protected/DynamicPages/SingleService.tsx")
);
const SingleSalesPerson = lazy(
  () => import("./pages/Protected/DynamicPages/SingleSalesPerson.tsx")
);
const SingleSalesChannel = lazy(
  () => import("./pages/Protected/DynamicPages/SingleSalesChannel.tsx")
);
const SingleCustomer = lazy(
  () => import("./pages/Protected/DynamicPages/SingleCustomer.tsx")
);
const SingleOrder = lazy(
  () => import("./pages/Protected/DynamicPages/SingleOrder.tsx")
);

export default function App() {
  {
    //TODO: 10. Komponentot za Bar-ot gore shto ke bide treba da e
    //<AppBar/>
    //TODO 1. Theme switch button component
    //--->Color sheme sredi za da mozes da menuvash theme
    //--->Positioning-ot napravi go abstrakten
    //---> Theme switch transition implementiraj
    // TODO: Make this a dropdown menu with Light, Dark and System color switch options
  }

  // TODOs: 2. Active page display-ni na navbar

  // TODOs: 3. Implementiraj Styled API za po clean code

  // TODOs: 4. Popravi go Glow-ot na dark mode na LoginModal
  //  ---> na hover napravi go da sveti maaaalku pojako glow-ot

  {
    // TODOs: 5. Logout portion of SideNavBar
    // TODOs: 6. Avatar portion of SideNavBar
  }

  //TODOs: 7. Mobile Responsive NavBar

  //TODOs: 8. Hamburger menu Navbar toggle
  //--> Navbar toggle opcija na tablet + backdrop dimmed koga
  //ke e uklucen
  {
    // TODOs: 9. Implement firebase for the admin user and the company data
    //IMPORTANT: Make a separate git branch for this
  }
  {
    // TODOs: 10. Add another account with firebase and POST method 🤔
  }
  {
    // TODOs: 11. Create a higher level state for the drawer to open
  }
  return (
    <ErrorProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppTheme>
            <Suspense fallback={<Loading />}>
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
                  <Route index path="/" element={<Homepage />}></Route>
                  <Route path="goods" element={<Goods />}></Route>
                  <Route path="services" element={<Services />}></Route>
                  <Route path="employees" element={<Employees />}></Route>
                  <Route
                    path="sales-channels"
                    element={<SalesChannels />}
                  ></Route>
                  <Route path="customers" element={<Customers />}></Route>
                  <Route path="orders" element={<Orders />}></Route>
                  <Route path="compare" element={<Compare />}></Route>
                  <Route path="*" element={<Error />} />

                  {/* Dynamic Routes */}
                  <Route path="goods/:goodId" element={<SingleGood />} />
                  <Route
                    path="services/:serviceId"
                    element={<SingleService />}
                  />
                  <Route
                    path="customers/:customerId"
                    element={<SingleCustomer />}
                  />
                  <Route path="order/:orderId" element={<SingleOrder />} />
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
      </AuthProvider>
    </ErrorProvider>
  );
}
