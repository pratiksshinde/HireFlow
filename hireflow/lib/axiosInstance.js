import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  withCredentials: true,           
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 150000,
});

export default axiosInstance;
