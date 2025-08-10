

import Elysia, { status } from "elysia";
import { authUser } from "../../middleware/auth";
import { CartDB } from "../../lib/service/cart";
import { stripe } from "../../config/stripe";
import { SERVER_CONFIG } from "../../config/env.global";
import { Transaction } from "../../model/transaction.model";
import { Order } from "../../model/order.model";

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
            };

            const orderItems = addCart.map(item => ({
                productID: item.productID._id,
                quantity: item.quantity,
                price: item.productID.productPrice
            }));

            const totalAmount = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

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

            const frontendUrl = SERVER_CONFIG.FRONTEND_URL[0];
            if (!frontendUrl) {
                throw new Error("Frontend URL is not defined in the environment configuration.");
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${frontendUrl}/shop?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${frontendUrl}`,
                metadata: {
                    userID: findUser._id.toString()
                }
            });

            const newTransaction = new Transaction({
                userID: findUser._id,
                stripeSessionId: session.id,
                status: "pending",
                amount: totalAmount,
                currency: "MYR",
            })
            await newTransaction.save();

            const newOrder = new Order({
                userID: findUser._id,
                items: orderItems,
                totalAmount: totalAmount,
                stripeSessionId: session.id,
                paymentStatus: 'pending',
            });
            await newOrder.save();

            return status(201, {
                success: true,
                message: "Checkout session created.",
                output: session.url,
            });
        } catch (error) {
            throw error;
        }
    })