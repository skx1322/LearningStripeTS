import Elysia, { status } from "elysia";
import { authUser } from "../../middleware/auth";

export const account = new Elysia()
    .use(authUser)
    .get("/isAuth", async ({ findUser }) => {
        return status(200, {
            success: true,
            message: `User are authorized!`,
            output: {
                username: findUser.username,
                isAuthorized: true,
            },
        });
    })
    .get("/", async ({ findUser }) => {
        return status(200, {
            success: true,
            message: `Account document successfully retrieved!`,
            output: findUser,
        });
    })