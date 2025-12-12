import axiosInstance from "../lib/axiosInstance"

export const login = async (email,password)=>{
    try {
        const response = await axiosInstance.post("/login" , {email,password})
        return { success: true, user: res.data.user };
    } catch (error) {
        return { success: false,
            message: error.response?.data?.message || error.message,
            };}

    }


export const register = async (fullname,email,password)=>{
    try {
        const response = await axiosInstance.post("/register" , {fullname,email,password})
        return { success: true, message: res.data?.message };
    } catch (error) {
        return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
    }
}
