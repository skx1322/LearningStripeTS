import { status } from "elysia";
import { CartShopping } from "../../model/cart.model";
import { Product } from "../../model/product.model";
import { CartFormat } from "../../types/types";

// to add
// 1. create cart (one per user), 2. add item to cart, 3. update cart items, 4. delete cart items, 5. expire cart, 6. validate
export class CartDB {
    static async addToCart(userID: string, productID: string, quantity: number) {
        try {
            const currentProduct = await Product.findOne({ _id: productID });
            if (!currentProduct) {
                throw status(404, {
                    success: false,
                    message: "Product not found."
                });
            };

            const existingCartItem = await CartShopping.findOne({ userID, productID });

            if (currentProduct.productQuantity < quantity || currentProduct.productQuantity <= 0 || currentProduct.productQuantity < (<number>existingCartItem?.quantity + quantity)) {
                throw status(403, {
                    success: false,
                    message: "Product does not have enough stock."
                });
            }

            if (existingCartItem) {
                existingCartItem.quantity += quantity;
                await existingCartItem.save();
                return existingCartItem;
            }
            else {
                const newCartItem = new CartShopping({
                    userID,
                    productID,
                    quantity,
                })
                await newCartItem.save();
                return newCartItem;
            }
        } catch (error) {
            throw error;
        }
    };

    static async updateCartItem(userID: string, productID: string, newQuantity: number) {
        if (newQuantity <= 0) {
            return this.deleteCartItem(userID, productID);
        }

        const currentProduct = await Product.findOne({ _id: productID });
        if (!currentProduct) {
            throw status(404, {
                success: false,
                message: "Product not found."
            });
        }

        if (currentProduct.productQuantity < newQuantity || currentProduct.productQuantity <= 0) {
            throw status(403, {
                success: false,
                message: "Product does not have enough stock."
            });
        }

        try {
            const updatedItem = await CartShopping.findOneAndUpdate(
                { userID, productID },
                { quantity: newQuantity, updatedAt: new Date() },
                { new: true, runValidators: true }
            )

            if (!updatedItem) {
                throw status(404, {
                    success: false,
                    message: "Cart item not found.",
                });
            }

            return updatedItem;
        } catch (error) {
            throw error;
        }
    };

    static async getCart(userID: string) {
        try {
            const cartItems = await CartShopping.find({ userID }).populate('productID') as unknown as CartFormat[];
            return cartItems;
        } catch (error) {
            throw error;
        }
    };

    static async deleteCartItem(userID: string, productID: string) {
        try {
            const deletedItem = await CartShopping.findOneAndDelete({ userID, productID });

            if (!deletedItem) {
                throw status(404, {
                    success: false,
                    message: "Cart item not found.",
                });
            }

            return deletedItem;
        } catch (error) {
            throw error;
        }
    };
}