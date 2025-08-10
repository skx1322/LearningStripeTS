import axios from "axios";
import * as React from "react";
import { baseURL, publicAPI } from "../api/publicAPI";
import type { AccountDocument, APICall, userDoc } from "../types/types";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router";
import { userAPI } from "../api/accessAPI";
import toast from "react-hot-toast";
import Cart from "./shoppingCart";

const Shopper = () => {
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);
  const [currentUser, setCurrentUser] = React.useState<AccountDocument>();
  const [showCart, setShowCart] = React.useState(false);

  const scanAuth = async () => {
    const response = await axios.get<APICall<boolean>>(
      `${baseURL}/${publicAPI.shopAuth.url}`,
      { withCredentials: true }
    );
    if (response.data.success) {
      setIsAuthorized(response.data.output);
    }
  };

  const userDoc = async () => {
    const response = await axios.get<userDoc>(
      `${baseURL}/${userAPI.userDoc.url}`,
      { withCredentials: true }
    );
    if (response.data.success) {
      setCurrentUser(response.data.output);
    }
    else {
      toast.error(response.data.message);
    }
  };

  React.useEffect(() => {
    scanAuth();
    userDoc();
  }, []);

  if (isAuthorized) {
    return (
      <header className="bg-primary shadow-2xl sticky z-20 top-0 flex justify-between border-b border-support-gray-dark px-4 py-2 sm:px-48 items-center">
        <div className="flex items-center gap-4">
          <Link to="/profile">
            <img src={currentUser?.avatar} alt="pfp" className="w-12 h-12 rounded-full"/>
          </Link>
        </div>

        <div className="hidden sm:block flex-grow mx-10">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2"
          />
        </div>

        <div className="relative inline-flex items-center">
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative p-2 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            <FaCartShopping className="h-6 w-6" />
          </button>
          {
            showCart ? <Cart></Cart> : null
          }
        </div>
      </header>
    );
  } else {
    return null;
  }
};

export default Shopper;
