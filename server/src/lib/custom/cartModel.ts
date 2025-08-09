import Elysia, { t } from "elysia";

export const cartModel = new Elysia({ name: "productCreate" })
    .model({
        cartAdd: t.Object({
            productID: t.String(),
            quantity: t.Numeric(),
        })
    })
    .model({
        cartUpdate: (t.Object({
            productID: t.String(),
            quantity: t.Numeric(),
        }))
    })
    .model({
        cartDelete: (t.Object({
            productID: t.String(),
        }))
    })