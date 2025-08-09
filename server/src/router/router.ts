import Elysia from "elysia";
import { accountUser } from "../controller/user/access";
import { account } from "../controller/user/document";
import { accountLogout } from "../controller/user/logout";
import { product } from "../controller/merchant/product";

export const router = new Elysia({ prefix: "/api" });

router.group('/user', (app) =>
    app
        .onError(({ code, error }) => {
            if (code === 500) {
                return {
                    success: false,
                    message: "Something went wrong within the server/database for blog service.",
                    output: error
                }
            }
        })
        .use(accountUser)
        .use(account)
        .use(accountLogout)
)

router.group('/items', (app) =>
    app
        .onError(({ code, error }) => {
            if (code === 500) {
                return {
                    success: false,
                    message: "Something went wrong within the server/database for blog service.",
                    output: error
                }
            }
        })
        .use(product))