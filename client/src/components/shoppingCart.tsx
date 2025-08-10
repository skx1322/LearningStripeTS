import * as React from "react";
import type { CartFormat, userCart } from "../types/types";
import axios from "axios";
import { baseURL, publicAPI } from "../api/publicAPI";
import toast from "react-hot-toast";

const Cart = () => {
  const [cartItems, setCartItems] = React.useState<CartFormat[]>([]);

  const getCart = async () => {
    const response = await axios.get<userCart>(
      `${baseURL}/${publicAPI.shoppingCart.url}`,
      { withCredentials: true }
    );
    if (response.data.success) {
      setCartItems(response.data.output);
    } else {
      toast.error(response.data.message);
    }
  };

  React.useEffect(() => {
    getCart();
  }, []);

  const updateQuantity = async (productID: string, quantity: number) => {
    try {
      const response = await axios.put<userCart>(
        `${baseURL}/${publicAPI.shoppingCart.url}`,
        {
          productID,
          quantity,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        getCart();
        toast.success("Cart item quantity updated!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update quantity.");
    }
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.productID.productPrice * item.quantity,
    0
  );

  return (
    <div className="absolute top-full right-0 mt-2 w-80 p-4 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
            {cartItems.map((data) => (
              <li key={data._id} className="py-4 flex gap-4 items-center">
                <img
                  src={data.productID.productImage}
                  alt={data.productID.productName}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {data.productID.productName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    ${data.productID.productPrice.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(data.productID._id, data.quantity - 1)
                    }
                    className="p-1 text-gray-500 hover:text-gray-900"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={data.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        data.productID._id,
                        parseInt(e.target.value)
                      )
                    }
                    className="w-12 text-center border rounded-md"
                    min="0"
                  />
                  <button
                    onClick={() =>
                      updateQuantity(data.productID._id, data.quantity + 1)
                    }
                    className="p-1 text-gray-500 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <button className="w-full mt-4 bg-primary text-white py-2 rounded-lg hover:bg-opacity-90">
              Checkout
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
