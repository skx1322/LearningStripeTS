import { status } from "elysia";
import { CartShopping } from "../../model/cart.model";

// to add
// 1. create cart (one per user), 2. add item to cart, 3. update cart items, 4. delete cart items, 5. expire cart, 6. validate
export class PaymentDB {
    static async deleteCartItem(userID: string) {
        try {
            const deletedItem = await CartShopping.deleteMany({userID});
            if (deletedItem.deletedCount === 0) {
                throw status(404, {
                    success: false,
                    message: "Cart was already empty.",
                });
            }
            
            return deletedItem;
        } catch (error) {
            throw error;
        }
    };
}