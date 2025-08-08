import * as React from "react";
import Login from "../components/login";
import Register from "../components/register";

const Access = () => {
  const [currentPage, setCurrentPage] = React.useState<"Register" | "Login">(
    "Login"
  );

  return (
    <>
      {currentPage === "Login" ? (
        <Login setCurrentPage={setCurrentPage} />
      ) : (
        <Register setCurrentPage={setCurrentPage} />
      )}
    </>
  );
};

export default Access;
