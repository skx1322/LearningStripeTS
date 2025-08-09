import Elysia, { status } from "elysia";
import { authUser } from "../../middleware/auth";
import { ProductDB } from "../../lib/service/product";
import { productModel } from "../../lib/custom/productModel";

export const product = new Elysia()
    .use(authUser)
    .use(productModel)
    .post("/product", async ({ body, findUser }) => {
        const newProduct = await ProductDB.createProduct(body, findUser._id);
        return status(201, {
            success: true,
            message: `New product successfully created.`,
            output: newProduct
        })
    }, {
        body: "product"
    })
    .get("/product", async ({ findUser }) => {
        const newProduct = await ProductDB.readProduct(findUser._id);
        return status(201, {
            success: true,
            message: `Product successfully retrieved.`,
            output: newProduct
        })
    })
    .put("/product/:productID", async ({ body, params: { productID }, findUser }) => {
        const updateProduct = await ProductDB.updateProduct(body, productID, findUser._id)
        return status(200, {
            success: true,
            message: `Product successfully updated.`,
            output: updateProduct
        })
    }, {
        body: "productUpdate",
    })
    .delete("/product", async ({ body, findUser }) => {
        const updateProduct = await ProductDB.deleteProduct(body.productID, findUser._id);
        return status(200, {
            success: true,
            message: `Product successfully deleted.`,
            output: updateProduct
        })
    }, {
        body: "productDelete"
    })