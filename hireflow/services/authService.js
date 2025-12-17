import axiosInstance from "../lib/axiosInstance"

export const login = async (email,password)=>{
    try {
        const response = await axiosInstance.post("/auth/login" , {email,password})
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("username", response.data.userName);
        return { success: true, user: response };
    } catch (error) {
        return { success: false,
            message: error.response?.data?.message || error.message,
            };}

    }


export const register = async (username,email,password)=>{
    try {
        const response = await axiosInstance.post("/auth/register" , {username,email,password})
        return { success: true, message: response.data?.message };
    } catch (error) {
        return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
    }
}

export const getProfile = async ()=>{
    try {
        const response = await axiosInstance.get("/resume/getPortfolio");
        console.log("Profile response:", response);
        return { success: true, user: response.data.user };
    } catch (error) {
        return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
    }
}

export const uploadResume = async (formData)=>{
    try {
        const response = await axiosInstance.post("/resume/uploadResume" , formData ,{
             headers: { "Content-Type": "multipart/form-data" }
        });
        return { success: true, username: response.data.username };
    }catch (error) {
        return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
    }
}   