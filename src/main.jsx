import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ProductsProvider } from "./ProductsContext";
import { CartProvider } from "./CartContext";
import Home from "./components/Home";
import Store from "./components/Store";
import Product from "./components/Product";
import Cart from "./components/Cart";
import ErrorPage from "./components/ErrorPage";
import "./index.css";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "store",
    element: <Store />,
  },
  {
    path: "store/:id",
    element: <Product />,
  },
  {
    path: "cart",
    element: <Cart />,
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductsProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ProductsProvider>
  </StrictMode>
);
