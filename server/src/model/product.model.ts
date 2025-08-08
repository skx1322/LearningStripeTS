import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    productID: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        default: 'https://placehold.co/200x200',
    },
    productInStock: {
        type: Boolean,
        default: true,
    },
    productQuantity: {
        type: Number,
        default: 0,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productDiscountPrice: {
        type: Number,
    },
    productTangible: {
        type: Boolean,
        default: true,
    },
    productRefund: {
        type: Number,
    },
    productCategory: {
        type: [String],
        required: true,
    },
    productMerchant: {
        type: Schema.Types.ObjectId,
        ref: 'Merchant',
        required: true,
    },
    productBrand: {
        type: String,
    },
});

export const Product = model('Product', ProductSchema);