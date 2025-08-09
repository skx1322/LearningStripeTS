import Elysia, { status } from "elysia";
import { authUser } from "../../middleware/auth";
import { ProductDB } from "../../lib/service/product";
import { CartDB } from "../../lib/service/cart";
import { cartModel } from "../../lib/custom/cartModel";

export const cart = new Elysia()
    .use(authUser)
    .use(cartModel)
    .post("/cart", async ({ body: { productID, quantity }, findUser }) => {
        const addCart = await CartDB.addToCart(findUser._id, productID, quantity)
        return status(201, {
            success: true,
            message: `Product successfully been added to cart.`,
            output: addCart
        })
    }, {
        body: "cartAdd"
    })
    .get("/cart", async ({ findUser }) => {
        const cartCheck = await CartDB.getCart(findUser._id);
        return status(200, {
            success: true,
            message: `Product within cart successfully retrieved.`,
            output: cartCheck
        })
    })
    .put("/cart", async ({ body: { productID, quantity }, findUser }) => {
        const cartUpdate = await CartDB.updateCartItem(findUser._id, productID, quantity);
        return status(200, {
            success: true,
            message: `Product within cart successfully retrieved.`,
            output: cartUpdate
        })
    }, {
        body: "cartUpdate"
    })
    .delete("/cart", async ({ body: { productID }, findUser }) => {
        const cartUpdate = await CartDB.deleteCartItem(findUser._id, productID);
        return status(200, {
            success: true,
            message: `Product within cart successfully retrieved.`,
            output: cartUpdate
        })
    }, {
        body: "cartDelete"
    })