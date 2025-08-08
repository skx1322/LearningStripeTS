import Elysia, { t } from "elysia";

export const accountModel = new Elysia({ name: "userRegister" })
    .model({
        register: t.Object({
            username: t.String(),
            email: t.String(),
            password: t.String(),

            avatar: t.Optional(t.File()),
        })
    })
    .model({
        login: t.Object({
            username: t.String(),
            password: t.String(),
        })
    })