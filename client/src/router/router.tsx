import { createBrowserRouter } from "react-router";
import Main from "../components/main";
import Home from "../pages/home";
import Access from "../pages/access";
import Product from "../pages/product";
import Shop from "../pages/shop";
import About from "../pages/about";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/account",
        element: <Access />,
      },
      {
        path: "/product/:productID",
        element: <Product />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
    ],
  },
]);

export default router;
