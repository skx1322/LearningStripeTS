import * as React from "react";
import { baseURL, publicAPI } from "../api/publicAPI";
import type { getCatalog, ProductItems } from "../types/types";
import axios from "axios";
import toast from "react-hot-toast";
import { CatalogItem } from "../components/items";

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
      toast.error(`Internal server API error.`);
    }
  };

  React.useEffect(() => {
    callCatalog();
  }, [])
  

  const getUniqueCategories = () => {
    const allCategories = currentProduct.flatMap((item) => item.productCategory);
    return ["All", ...Array.from(new Set(allCategories))];
  };

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
              <CatalogItem currentProduct={currentProduct}/>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Shop;
