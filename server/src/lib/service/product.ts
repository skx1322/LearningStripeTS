import { status } from "elysia";
import { Product } from "../../model/product.model";
import { ProductCreate, ProductItems, ProductUpdate } from "../../types/types";
import { deleteS3File, uploadImage } from "./s3";
import mongoose from "mongoose";

export class ProductDB {
    static async createProduct(productCreate: ProductCreate, userID: string) {
        try {
            const imageUpload = await uploadImage(<File>productCreate.productImage);
            if (!imageUpload) {
                throw new Error("Unable to upload product images, product upload cancelled.");
            }

            let itemsCategory: string[];
            if (productCreate.productCategory === undefined) {
                itemsCategory = [];
            } else if (Array.isArray(productCreate.productCategory)) {
                itemsCategory = productCreate.productCategory;
            } else {
                itemsCategory = [productCreate.productCategory];
            }

            const payload = {
                productName: productCreate.productName,
                productDescription: productCreate.productDescription,
                productImage: imageUpload,
                productInStock: false,
                productQuantity: 0,
                productPrice: productCreate.productPrice,
                productTangible: productCreate.productTangible,
                productCategory: itemsCategory,
                productMerchant: userID,
            };

            const newProduct = new Product(payload);
            const savedProduct = await newProduct.save();
            return savedProduct;
        } catch (error) {
            throw error;
        }
    };

    static async readProduct(userID: string) {
        try {
            const merchantID = new mongoose.Types.ObjectId(userID).toString();
            const product = await Product.find({ productMerchant: merchantID }) as ProductItems[];

            return product;
        } catch (error) {
            throw error;
        }
    }

    static async allProduct() {
        try {
            const product = await Product.find({ productInStock: true }) as ProductItems[];
            return product;
        } catch (error) {
            throw error;
        }
    }

    static async singleProduct(productID: string) {
        try {
            const product = await Product.findById(productID) as ProductItems;
            return product;
        } catch (error) {
            throw error;
        }
    }

    static async updateProduct(productCreate: ProductUpdate, productID: string, userID: string) {
        try {
            const findProduct = await Product.findOne({
                _id: productID,
                productMerchant: userID
            });
            if (!findProduct) {
                throw status(404, {
                    success: false,
                    message: `Product does not exist.`
                })
            }

            let currentImage = findProduct?.productImage as string;
            if (productCreate.productImage instanceof File) {
                const newImage = await uploadImage(productCreate.productImage);
                const deleteImage = await deleteS3File(currentImage);
                currentImage = newImage;
            }

            let itemsCategory: string[];
            if (productCreate.productCategory === undefined) {
                itemsCategory = findProduct.productCategory;
            } else if (Array.isArray(productCreate.productCategory)) {
                itemsCategory = productCreate.productCategory;
            } else {
                itemsCategory = [productCreate.productCategory];
            }

            const payload = {
                productName: productCreate.productName || findProduct?.productName,
                productDescription: productCreate.productDescription || findProduct?.productDescription,
                productImage: currentImage,
                productInStock: productCreate.productInStock || findProduct?.productInStock,
                productQuantity: productCreate.productQuantity || findProduct?.productQuantity,
                productPrice: productCreate.productPrice || findProduct?.productPrice,
                productTangible: productCreate.productTangible || findProduct?.productTangible,
                productCategory: itemsCategory || findProduct?.productCategory,
            };

            const savedProduct = await Product.findByIdAndUpdate(productID, payload, { new: true });
            return savedProduct;
        } catch (error) {
            throw error;
        }
    };

    static async deleteProduct(productID: string, userID: string) {
        try {
            const findProduct = await Product.findOne({
                _id: productID,
                productMerchant: userID
            });

            if (!findProduct) {
                throw status(404, {
                    success: false,
                    message: `Product does not exist.`
                })
            }

            const deleteImage = await deleteS3File(findProduct.productImage);
            if (!deleteImage) {
                throw status(404, {
                    success: false,
                    message: `Image file does not exist.`
                })
            }

            const deleteProduct = findProduct.deleteOne();
            return deleteProduct;
        } catch (error) {
            throw error;
        }
    }
}