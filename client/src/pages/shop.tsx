import * as React from "react";
import { Link } from "react-router";
import { baseURL, publicAPI } from "../api/publicAPI";
import type { getCatalog, ProductItems } from "../types/types";
import axios from "axios";
import toast from "react-hot-toast";

const Shop = () => {
  const [activeCategory, setActiveCategory] = React.useState<string>("All");
  const [currentProduct, setCurrentProduct] = React.useState<ProductItems[]>(
    []
  );

  const callCatalog = async () => {
    try {
      const response = await axios.get<getCatalog>(
        `${baseURL}/${publicAPI.catalogGet.url}`
      );
      if (response.data.success) {
        setCurrentProduct(response.data.output);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  React.useEffect(() => {
    callCatalog();
  }, [])
  

  const getUniqueCategories = () => {
    const allCategories = currentProduct.flatMap((item) => item.productCategory);
    return ["All", ...Array.from(new Set(allCategories))];
  };

  const filteredProducts =
    activeCategory === "All"
      ? currentProduct
      : currentProduct.filter((item) => item.productCategory.includes(activeCategory));

  return (
    <div className="bg-primary min-h-screen text-text-main py-12">
      <div className="container mx-auto px-4">
        <section className="bg-support-gray-dark text-center py-12 px-6 rounded-lg mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-accent-gold mb-2">
            Unlimited Discount Work!
          </h1>
          <span>
            <p className="text-xl text-text-secondary">
              Yes! 60% Discount, it is totally not the original price! (I
              think?)
            </p>
          </span>
          <button className="mt-6 cursor-pointer bg-accent-maroon text-secondary font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-accent-gold transition-colors duration-300">
            Buy Today!
          </button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-secondary mb-4">
              Categories
            </h2>
            <div className="flex flex-col gap-2">
              {getUniqueCategories().map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    px-4 py-2 rounded-lg text-left font-semibold transition-colors duration-300
                    ${
                      activeCategory === category
                        ? "bg-secondary text-primary"
                        : "bg-support-gray-dark text-text-secondary hover:bg-support-gray-light"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold text-secondary mb-4">Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Shop;
