import { Outlet } from "react-router";
import Footer from "./footer";
import Header from "./header";
import { Toaster } from "react-hot-toast";

const Main = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#FFFFFF",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "red",
              secondary: "black",
            },
          },
        }}
      />
      <Footer></Footer>
    </div>
  );
};

export default Main;
