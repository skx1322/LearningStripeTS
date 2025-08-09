import Elysia from "elysia";
import { accountUser } from "../controller/user/access";
import { account } from "../controller/user/document";
import { accountLogout } from "../controller/user/logout";
import { product } from "../controller/merchant/product";
import { cart } from "../controller/merchant/carting";
import { payment } from "../controller/market/checkout";
import { catalog } from "../controller/market/catalog";

export const router = new Elysia({ prefix: "/api" }).onError(({ code, error }) => {
    if (code === 500) {
        return {
            success: false,
            message: "Something went wrong within the server/database for blog service.",
            output: error
        }
    }
});

router.group('/user', (app) =>
    app
        .use(accountUser)
        .use(account)
        .use(accountLogout)
)

router.group('/items', (app) =>
    app
        .use(product))

router.group('/shopping', (app) =>
    app
        .use(cart))

router.group('/payment', (app) =>
    app
        .use(payment))

router.group('/catalog', (app) =>
    app
        .use(catalog))