import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
    userID: {
        type: String,
        required: true,
        ref: 'Account',
    },
    items: [{
        productID: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        price: { 
            type: Number,
            required: true,
        },
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    stripeSessionId: {
        type: String,
        required: true,
        unique: true,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
    shippingAddress: {
        type: Object, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Order = model('Order', OrderSchema);