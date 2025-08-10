import axios from "axios";
import { baseURL } from "../api/publicAPI";
import { userAPI } from "../api/accessAPI";
import type { APICall } from "../types/types";

export const paymentCheckout = async () => {
  try {
    const response = await axios.post<APICall<string>>(
      `${baseURL}/${userAPI.shopPayment.url}`,
      {},
      { withCredentials: true }
    );

    if (response.data.success && response.data.output) {
      window.location.href = response.data.output;
    } else {
      console.error("Backend did not return a redirect URL.");
    }
  } catch (error) {
    console.error(error);
  }
};
