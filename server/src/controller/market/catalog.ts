import Elysia, { status } from "elysia";
import { ProductDB } from "../../lib/service/product";

export const catalog = new Elysia()
    .get("/product", async () => {
        const prodcutRetrieve = await ProductDB.allProduct();
        return status(200, {
            success: true,
            message: `Product within cart successfully retrieved.`,
            output: prodcutRetrieve
        })
    })
    .get("/product-detail/:productID", async ({params: {productID}}) => {
        const prodcutRetrieve = await ProductDB.singleProduct(productID);
        return status(200, {
            success: true,
            message: `Product within cart successfully retrieved.`,
            output: prodcutRetrieve
        })
    })
