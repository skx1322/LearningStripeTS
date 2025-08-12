import { Link } from "react-router";
import type { ProductItems } from "../types/types";
import {
  FaBox,
  FaHeart,
  FaInfoCircle,
  FaMinus,
  FaPlus,
  FaShareAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

interface catalogProduct {
  currentProduct: ProductItems[];
}

export const CatalogItem = ({ currentProduct }: catalogProduct) => {
  return (
    <>
      {currentProduct.length > 0 ? (
        currentProduct.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className=" bg-support-gray-dark rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <div className="w-full aspect-w-16 aspect-h-9 overflow-hidden">
              <img
                src={product.productImage}
                alt={product.productName}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-text-main mb-1 truncate">
                {product.productName}
              </h3>
              <p className="text-text-secondary text-sm mb-4 truncate">
                {product.productDescription}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-secondary">
                  ${product.productPrice.toFixed(2)}
                </span>
                <span
                  className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    product.productInStock
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {product.productInStock ? "In Stock" : "Sold Out"}
                </span>
              </div>
              <button
                className={`w-full py-2 rounded-lg font-semibold transition-colors duration-300 ${
                  product.productInStock
                    ? "bg-accent-gold text-primary hover:bg-accent-maroon"
                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                }`}
                disabled={!product.productInStock}
              >
                {product.productInStock ? "Check" : "Out of Stock"}
              </button>
            </div>
          </Link>
        ))
      ) : (
        <p className="col-span-full text-center text-text-secondary text-xl">
          No products found in this category.
        </p>
      )}
    </>
  );
};

interface productDetail {
  product: ProductItems;
  productID: string;
  quantity: number;
  setQuantity: (newQuantity: number) => void;
  getCart: (productID: string, quantity: number) => Promise<void>;
}

export const ProductDetail = ({
  product,
  productID,
  quantity,
  setQuantity,
  getCart,
}: productDetail) => {
  const quantityPlus = () => {
    setQuantity(quantity + 1);
  };

  const quantityMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity + -1);
    } else {
      toast.error("Quantity must not be less than zero.");
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12">
      <div className="bg-support-gray-dark rounded-lg overflow-hidden relative">
        <div className="w-full aspect-w-16 aspect-h-9">
          <img
            src={product.productImage}
            alt={product.productName}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-support-gray-light text-primary p-3 rounded-full hover:bg-secondary transition-colors duration-300">
            <FaHeart />
          </button>
          <button className="bg-support-gray-light text-primary p-3 rounded-full hover:bg-secondary transition-colors duration-300">
            <FaShareAlt />
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <h1 className="text-4xl font-bold text-secondary">
          {product.productName}
        </h1>
        <div className="flex items-center space-x-4 text-support-gray-light">
          <div className="flex items-center space-x-1">
            <FaBox className="text-accent-gold" />
            <span className="text-text-main">{product.productQuantity}</span>
          </div>
        </div>

        <div className="bg-support-gray-dark rounded-lg p-6">
          <span className="text-3xl font-bold text-accent-gold">
            ${product.productPrice.toFixed(2)}
          </span>
        </div>

        <div className="space-y-2 text-text-secondary">
          <p className="flex items-center space-x-2">
            <FaInfoCircle className="text-support-gray-light" />
            <span>Status:</span>
            <span
              className={`font-semibold ${
                product.productInStock ? "text-green-400" : "text-red-400"
              }`}
            >
              {product.productInStock ? "In Stock" : "Sold Out"}
            </span>
          </p>
          <p className="flex items-center space-x-2">
            <FaInfoCircle className="text-support-gray-light" />
            <span>Item Type:</span>
            <span className="font-semibold text-text-main">
              {product.productTangible ? "Physical" : "Digital"}
            </span>
          </p>
          <p className="text-sm">
            * Refund policy:{" "}
            {product.productTangible
              ? "1-day money-back guarantee! I'm being generous!"
              : "Final sale, no refunds."}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-text-main font-semibold">Quantity</span>
          <div className="flex items-center space-x-2 bg-support-gray-dark rounded-lg p-2">
            <button
              onClick={quantityMinus}
              className="text-text-main hover:text-secondary"
            >
              <FaMinus />
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="w-12 text-center bg-transparent focus:outline-none text-text-main"
            />
            <button
              onClick={quantityPlus}
              className="text-text-main hover:text-secondary"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <button
          onClick={() => getCart(productID, quantity)}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-colors duration-300 ${
            product.productInStock
              ? "bg-accent-gold text-primary hover:bg-accent-maroon"
              : "bg-gray-500 text-gray-300 cursor-not-allowed"
          }`}
          disabled={!product.productInStock}
        >
          {product.productInStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </section>
  );
};
