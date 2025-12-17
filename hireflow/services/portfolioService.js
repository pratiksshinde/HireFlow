import axiosInstance from "../lib/axiosInstance";

export const getPortfolio = async (username) => { 
    try {
        const response = await axiosInstance.get(`/resume/getPortfolio/${username}`);
        return { success: true, portfolio: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
        };
    }
}
