import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate, useLocation } from "react-router-dom";
import Body from "./components/Body";
import Home from "./components/home/Home";
import Fashion from "./components/Fashion";
import BestDeals from "./components/BestDeals";
import Electronics from "./components/Electronics";
import BestSellers from "./components/BestSellers";
import LoginPage from "./components/LoginPage";
import BuyNowPage from "./components/BuyNow/BuyNowPage";
import Cart from "./components/Cart";
import { CartProvider } from "./components/context/CartContext";
import { OrderProvider } from "./components/context/OrderContext";
import Disclaimer from "./components/usefulLinks/Disclaimer";
import PrivacyPolicy from "./components/usefulLinks/PrivacyPolicy";
import RefundPolicy from "./components/usefulLinks/RefundPolicy";
import CookiePolicy from "./components/usefulLinks/CookiePolicy";
import TermsAndCondition from "./components/usefulLinks/TermsAndCondition";
import DataProtectionPolicy from "./components/usefulLinks/DataProtectionPolicy";
import OrderHistory from "./components/OrderHistory";


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const location = useLocation();
  return isAuthenticated ? children : <Navigate to="/Login" state={{ from: location.pathname }} />;
};

const rout = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Electronics",
        element: <Electronics />,
      },
      {
        path: "/Fashion",
        element: <Fashion />,
      },
      {
        path: "/BestDeals",
        element: <BestDeals />,
      },
      {
        path: "/BestSellers",
        element: <BestSellers />,
      },
      {
        path: "/Disclaimer",
        element: <Disclaimer />,
      },
      {
        path: "/PrivacyPolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/RefundPolicy",
        element: <RefundPolicy />,
      },
      {
        path: "/CookiePolicy",
        element: <CookiePolicy />,
      },
      {
        path: "/TermsAndCondition",
        element: <TermsAndCondition />,
      },
      {
        path: "/DataProtectionPolicy",
        element: <DataProtectionPolicy />,
      },
    ],
  },
  {
    path: "/Login",
    element: <LoginPage />,
  },
  {
    path: "/BuyNow/:id",
    element: <BuyNowPage />,
  },
  {
    path: "/Cart",
    element: <ProtectedRoute><Cart /></ProtectedRoute>,
  },
  {
    path: "/Orders",
    element: <OrderHistory />,
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <OrderProvider>
      <CartProvider>
        <RouterProvider router={rout} />
      </CartProvider>
    </OrderProvider>
  </React.StrictMode>
);