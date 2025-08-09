

import Elysia, { status } from "elysia";
import { authUser } from "../../middleware/auth";
import { CartDB } from "../../lib/service/cart";
import { stripe } from "../../config/stripe";
import { ProductItems } from "../../types/types";
import { SERVER_CONFIG } from "../../config/env.global";

export const payment = new Elysia()
    .use(authUser)
    .post("/checkout", async ({ findUser }) => {
        try {
            const addCart = await CartDB.getCart(findUser._id);
            if (!addCart || addCart.length === 0) {
                throw status(400, {
                    success: false,
                    message: "Your cart is empty.",
                });
            }

            const line_items = addCart.map(item => {
                const product = item.productID;
                return {
                    price_data: {
                        currency: "MYR",
                        product_data: {
                            name: product.productName,
                            description: product.productDescription,
                            images: [product.productImage],
                        },
                        unit_amount: Math.round(product.productPrice * 100),
                    },
                    quantity: item.quantity,
                };
            });

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${SERVER_CONFIG.FRONTEND_URL[0]}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${SERVER_CONFIG.FRONTEND_URL[0]}/cancel`,
            });

            return status(201, {
                success: true,
                message: "Checkout session created.",
                redirect_url: session.url,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    })