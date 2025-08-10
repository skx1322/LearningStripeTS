import type { Elysia } from "elysia";
import { JWTDefault } from "../config/access";
import { Account } from "../model/user.model";
import { AccountDocument } from "../types/types";

export const authUser = (app: Elysia) =>
    app
        .use(JWTDefault)
        .derive(async function handler({ JWTDefault, cookie: { userSession }, status }) {
            const payload = await JWTDefault.verify(userSession.value);
            if (!payload) {
                throw status(401, {
                    success: false,
                    message: "Unauthorized to use due to missing token.",
                })
            };
            const { userID } = payload;

            const findUser = await Account.findOne({ _id: userID }).select("-password") as AccountDocument;
            if (!findUser) {
                throw status(404, {
                    success: false,
                    message: "User not found within the data.",
                })
            };

            if (findUser.status === "Inactive") {
                throw status(403, {
                    success: false,
                    message: "User account are inactive, the document won't be accessible.",
                })
            }

            return {
                findUser,
            }
        })

export const authLogout = (app: Elysia) =>
    app
        .use(JWTDefault)
        .derive(async function handler({ JWTDefault, cookie: { userSession }, status }) {
            const payload = await JWTDefault.verify(userSession.value);
            if (!payload) {
                return status(401, {
                    success: false,
                    message: "Unauthorized to use due to missing token.",
                })
            };
            const { userID } = payload;

            const findUser = await Account.findById(userID);
            if (!findUser) {
                return status(404, {
                    success: false,
                    message: "User not found within the data.",
                })
            };
            delete userSession.value;
            userSession.remove();
        })
