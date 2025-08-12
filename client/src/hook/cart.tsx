import axios from "axios";
import { baseURL, publicAPI } from "../api/publicAPI";
import type { APICall, CartFormat, ProductItems } from "../types/types";
import toast from "react-hot-toast";
import * as React from "react";

export const getCart = async (productID: string, quantity: number) => {
  const response = await axios.post<APICall<CartFormat>>(
    `${baseURL}/${publicAPI.shoppingCart.url}`,
    { productID, quantity },
    { withCredentials: true }
  );
  if (response.data.success) {
    toast.success(response.data.message);
  } else {
    toast.error(response.data.message);
  }
};

type UseProductDetailReturn = {
  product: ProductItems | null;
  productDetail: (productID: string) => Promise<void>;
};

export const useProductDetail = (): UseProductDetailReturn => {
  const [product, setProduct] = React.useState<ProductItems | null>(null);

  const productDetail = async (productID: string) => {
    try {
      const response = await axios.get<APICall<ProductItems>>(
        `${baseURL}/${publicAPI.catalogDetail.url}/${productID}`
      );
      if (response.data.success) {
        setProduct(response.data.output);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(`Internal server API error.`);
    }
  };
  return { product, productDetail };
};
