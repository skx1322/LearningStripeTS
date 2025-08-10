export interface APICall<T> {
    success: boolean,
    message: string,
    output: T
}

export type getCatalog = APICall<ProductItems[]>;

export type userCart = APICall<CartFormat[]>;

export type userDoc = APICall<AccountDocument>;

export interface AccountLogin {
    username: string,
    password: string,
};

export interface AccountRegister {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
};

export type status = "Active" | "Inactive";

export type permission = "User" | "Admin";
export interface AccountDocument {
    username: string,
    email: string,
    avatar: string,
    status: status,
    permission: permission,
    lastLogin: Date,
    createdAt: Date,
}
export interface ProductItems {
    _id: string
    productName: string,
    productDescription: string,
    productImage: string,
    productInStock: boolean,

    productQuantity: number,

    productPrice: number,
    productDiscountPrice?: number,

    productTangible: boolean,
    productRefund?: number,
    productCategory: string[],
    productMerchant: string,
    productBrand?: string,
}

export interface CartFormat {
    _id: string,
    productID: ProductItems,
    quantity: number,
    userID: string,
    createdAt: string,
    updatedAt: string,
}

