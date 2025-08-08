import { Schema, model } from 'mongoose';

const MerchantSchema = new Schema({
    merchantID: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    merchantName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    merchantAvatar: {
        type: String,
        default: 'default-merchant.png',
    },
    merchantOwner: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    merchantProducts: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
});

export const Merchant = model('Merchant', MerchantSchema);