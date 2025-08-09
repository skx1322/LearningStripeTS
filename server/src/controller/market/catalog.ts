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
