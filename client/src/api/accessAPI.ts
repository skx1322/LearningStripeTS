
export const baseURL = import.meta.env.VITE_BACKEND_URL

export const userAPI = {
    register: {
        url: `api/user/account`,
    },
    login: {
        url: `api/user/login`,
    },
    userDoc: {
        url: `api/user/account`,
    },
    logout: {
        url: `api/user/logout`  
    },
    shopAuth: {
        url: `api/user/isAuth`,
    },
    shopPayment: {
        url: `api/payment/checkout`
    }
}