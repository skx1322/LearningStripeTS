import { Link, useParams } from "react-router";
import { Product as ProductData } from "../data/test";
import * as React from "react";
import {
  FaHeart,
  FaInfoCircle,
  FaMinus,
  FaPlus,
  FaShareAlt,
  FaStar,
  FaStore,
} from "react-icons/fa";

const Product = () => {
  const { productID } = useParams();
  const product = ProductData.find((p) => p._id === productID);

  if (!product) {
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center text-text-main text-2xl font-bold">
        Product not found!
      </div>
    );
  }

  const [quantity, setQuantity] = React.useState(1);

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };
  return (
    <div className="bg-primary min-h-screen text-text-main py-12">
      <div className="container mx-auto px-4">
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
                <FaStar className="text-accent-gold" />
                <span className="text-text-main">4.5</span>
                <span className="text-text-secondary">(23 ratings)</span>
              </div>
              <span className="text-text-main">|</span>
              <span className="text-text-main">32 sold</span>
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
                  onClick={() => handleQuantityChange(-1)}
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
                  onClick={() => handleQuantityChange(1)}
                  className="text-text-main hover:text-secondary"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <button
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

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-support-gray-dark rounded-lg p-6">
            <h2 className="text-2xl font-bold text-secondary mb-4">
              Merchant Info
            </h2>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://placehold.co/100x100"
                alt="Merchant"
                className="h-16 w-16 rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold text-text-main">
                  {product.productMerchant}
                </h3>
                <Link
                  to="#"
                  className="flex items-center space-x-2 text-accent-gold hover:underline"
                >
                  <FaStore />
                  <span>View Shop</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-support-gray-dark rounded-lg p-6">
            <h2 className="text-2xl font-bold text-secondary mb-4">
              Product Specifications
            </h2>
            <div className="space-y-4 text-text-secondary">
              <p>
                <span className="font-semibold text-text-main">
                  Categories:
                </span>
                <span className="ml-2">
                  {product.productCategory.join(", ")}
                </span>
              </p>
              <p>
                <span className="font-semibold text-text-main">Brand:</span>
                <span className="ml-2">{product.productBrand}</span>
              </p>
              <p>
                <span className="font-semibold text-text-main">
                  Description:
                </span>
                <span className="ml-2">{product.productDescription}</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Product;
