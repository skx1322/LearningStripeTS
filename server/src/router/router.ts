import Elysia from "elysia";
import { accountUser } from "../controller/user/access";
import { account } from "../controller/user/document";
import { accountLogout } from "../controller/user/logout";

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