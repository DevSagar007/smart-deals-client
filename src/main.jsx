import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./layout/RootLayout.jsx";
import Home from "./components/Home/Home.jsx";
import AllProducts from "./components/AllProducts/AllProducts.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import Register from "./components/Register/Register.jsx";
import MyProducts from "./components/MyProducts/MyProducts.jsx";
import MyBids from "./components/MyBids/MyBids.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import PrivateRoute from "./components/Routes/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allProducts",
        Component: AllProducts,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "myProducts",
            Component: MyProducts,
          },
          {
            path: "myBids",
            Component: MyBids,
          },
          {
            path: "ProductDetails/:id",
            loader: ({ params }) =>
              fetch(`http://localhost:3000/products/${params.id}`),
            Component: ProductDetails,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
