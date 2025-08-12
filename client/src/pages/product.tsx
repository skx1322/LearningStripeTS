import { useNavigate, useParams } from "react-router";
import * as React from "react";
import { getCart, useProductDetail } from "../hook/cart";
import { ProductDetail } from "../components/items";

// component fixed

const Product = () => {
  const navigate = useNavigate();
  const { productID } = useParams();
  if (!productID) {
    return navigate("/shop");
  }
  const [quantity, setQuantity] = React.useState<number>(1);
  const { product, productDetail } = useProductDetail();

  React.useEffect(() => {
    if (productID) {
      productDetail(productID);
    }
  }, [productID, productDetail]);

  React.useEffect(() => {
    productDetail(productID);
  }, []);

  if (!product) {
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center text-text-main text-2xl font-bold">
        Product not found!
      </div>
    );
  }

  return (
    <div className="bg-primary min-h-screen text-text-main py-12">
      <div className="container mx-auto px-4">
        <ProductDetail
          product={product}
          productID={productID}
          quantity={quantity}
          setQuantity={setQuantity}
          getCart={getCart}
        />
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
