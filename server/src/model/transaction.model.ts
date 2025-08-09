import { Schema, model } from 'mongoose';

const TransactionSchema = new Schema({
    userID: {
        type: String,
        required: true,
        ref: 'Account',
    },
    stripeSessionId: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ['pending', 'succeeded', 'failed', 'refunded'],
        default: 'pending',
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Transaction = model('Transaction', TransactionSchema);