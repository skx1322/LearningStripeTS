import Elysia, { t } from "elysia";

export const productModel = new Elysia({ name: "productCreate" })
    .model({
        product: t.Object({
            productName: t.String(),
            productDescription: t.String(),
            productImage: t.Optional(t.File()),
            productPrice: t.Numeric(),
            productTangible: t.Union([
                t.BooleanString(),
                t.Boolean()
            ]),
            productCategory: t.Optional(t.Union([
                t.Array(t.String()),
                t.String()
            ]))
        })
    })
    .model({
        productUpdate: t.Partial(t.Object({
            productName: t.String(),
            productDescription: t.String(),
            productImage: t.Optional(t.File()),
            productQuantity: t.Numeric(),
            productInStock: t.Union([
                t.BooleanString(),
                t.Boolean()
            ]),
            productPrice: t.Numeric(),
            productDiscountPrice: t.Numeric({ minimum: 1, maximum: 100 }),
            productTangible: t.Union([
                t.BooleanString(),
                t.Boolean()
            ]),
            productCategory: t.Optional(t.Union([
                t.Array(t.String()),
                t.String()
            ])),
            productBrand: t.String(),
        }))
    })
    .model({
        productDelete: t.Object({
            productID: t.String()
        })
    })