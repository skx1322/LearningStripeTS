
export const baseURL = import.meta.env.VITE_BACKEND_URL

export const publicAPI = {
    catalogGet: {
        url: `api/catalog/product`,
    },
    shoppingCart: {
        url: `api/shopping/cart`
    },
    shopAuth: {
        url: `api/user/isAuth`,
    },
}