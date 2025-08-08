
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
    userID: string,
    username: string,
    email: string,
    avatar: string,
    status: status,
    permission: permission,
    lastLogin: Date, 
    createdAt: Date,
}
export interface ProductItems {
    productID: string
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

export interface ShoppingCart {
    user: AccountDocument,
    items: ProductItems[],
}

export interface MerchantShop {
    merchantID: string,
    merchantName: string,
    merchantAvatar: string,
    merchantProducts?: ProductItems[],
    merchantOwner: AccountDocument
}