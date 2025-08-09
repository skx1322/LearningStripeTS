import { Schema, model } from 'mongoose';

const CartShoppingSchema = new Schema({
    cartID: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    productID: {
        type: String,
        required: true,
        trim: true,
        ref: 'Product', 
    },
    quantity: {
        type: Number,
        required: true,
        min: 1, 
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