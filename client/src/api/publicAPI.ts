
export const baseURL = import.meta.env.VITE_BACKEND_URL

export const publicAPI = {
    catalogGet: {
        url: `api/catalog/product`,
    },
    catalogDetail: {
        url: `api/catalog/product-detail`,
    },
    shoppingCart: {
        url: `api/shopping/cart`
    },
    shopAuth: {
        url: `api/user/isAuth`,
    },
}