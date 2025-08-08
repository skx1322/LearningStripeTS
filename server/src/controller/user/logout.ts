import Elysia, { status } from "elysia";
import { authLogout } from "../../middleware/auth";

export const accountLogout = new Elysia()
    .use(authLogout)
    .post("/logout", async () => {
        return status(200, {
            success: true,
            message: `Account successfully logout.`,
        });
    })