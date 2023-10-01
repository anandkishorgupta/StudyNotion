const BASE_URL = import.meta.env.VITE_BASE_URL
// AUTH ENDPOINTS 
export const endpoints = {
    SENDOTP_API:BASE_URL+ "/auth/sendotp",
    SIGNUP_API:BASE_URL+ "/auth/signup",
    LOGIN_API:BASE_URL+"/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API:BASE_URL+"/auth/reset-password"

    
}

// categories endpoints
export const categories = {
    CATEGORIES_API: BASE_URL + "/courses/showAllCategory" //fetch all categories
}