export type status = "Active" | "Inactive";
export type permission = "User" | "Admin";
export interface AccountCreate {
    userID: string,
    username: string,
    password: string,
    email: string,
    avatar: string,
    status: status,
    permission: permission,
    lastLogin: Date, 
    createdAt: Date,
}
export interface AccountLogin {
    username: string,
    password: string,
};

export interface AccountRegister {
    username: string,
    email?: string,
    password: string,
    avatar?: File | string
};

export interface AccountDocument {
    _id: string,
    username: string,
    email: string,
    avatar: string,
    status: status,
    permission: permission,
    lastLogin: Date, 
    createdAt: Date,
}

export interface ProductCreate {
    productName: string,
    productDescription: string,
    productImage?: File, 
    productPrice: number,
    productTangible: boolean,  
    productCategory?: string | string[],  
}

export interface ProductUpdate {
    productName?: string,
    productDescription?: string,
    productImage?: string | File,
    productInStock?: boolean,

    productQuantity?: number,
    
    productPrice?: number,
    productDiscountPrice?: number,

    productTangible?: boolean,
    productRefund?: number,
    productCategory?: string | string[],
    productBrand?: string,
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
    productCategory: string | string[],
    productMerchant: string,
    productBrand?: string,
}

export interface CartShopping {
    cartID: string,
    productID: string,
    quantity: number,
    userID: string,
    createdAt: string,
    updatedAt: string,
}

export interface MerchantShop {
    merchantID: string,
    merchantName: string,
    merchantAvatar: string,
    merchantProducts?: ProductItems[],
    merchantOwner: AccountDocument
}