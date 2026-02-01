import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://hireflow-backend.vercel.app/api",
  withCredentials: true,           
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 150000,
});

export default axiosInstance;
