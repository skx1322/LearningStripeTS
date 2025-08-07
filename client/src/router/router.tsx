import { createBrowserRouter } from "react-router";
import Main from "../components/main";
import Home from "../pages/home";
import Visit from "../pages/visit";
import Exhibit from "../pages/exhibit";

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
        path: "/exhibit",
        element: <Exhibit />,
      },
      {
        path: "/visit",
        element: <Visit />,
      },
    ],
  },
]);

export default router;
