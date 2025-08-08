import Elysia, { status } from "elysia";
import { accountModel } from "../../lib/custom/userModel";
import { DBAccount } from "../../lib/service/db";
import { JWTDefault } from "../../config/access";

export const accountUser = new Elysia()
    .use(accountModel)
    .use(JWTDefault)
    .post("/account", async ({ body: { username, password, email, avatar } }) => {
        const newAccount = await new DBAccount({ username, email, password, avatar }).CreateAccount();
        return status(201, {
                success: true,
                message: `Account successfully created!`,
                output: newAccount,
            });
    }, {
        body: "register",
    })
    .post("/login", async ({ body: { username, password }, cookie: {userSession}, JWTDefault   }) => {
        const userID = await new DBAccount({ username, password }).LoginAccount() as string;

        const cookieToken = await JWTDefault.sign({userID});
        userSession.set({
            value: cookieToken,
            httpOnly: true,
            secure: true,
            maxAge: 86400,
            sameSite: "none"
        })

        return status(200, {
            success: true,
            message: `Account successfully login!`,
            output: cookieToken
        })
    }, {
        body: "login",
    })