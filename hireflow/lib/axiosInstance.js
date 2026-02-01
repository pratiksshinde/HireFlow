import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://hireflow-backend-dizt.onrender.com/api",
  withCredentials: true,           
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 150000,
});

export default axiosInstance;
