import { Schema, model } from 'mongoose';

const CartShoppingSchema = new Schema({
    productID: {
        type: String,
        required: true,
        trim: true,
        ref: 'Product', 
    },
    quantity: {
        type: Number,
        required: true,
        min: 0, 
    },
    userID: {
        type: String,
        required: true,
        trim: true,
        ref: 'Account', 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

CartShoppingSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export const CartShopping = model('CartShopping', CartShoppingSchema);