import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  async (config) => {
    config.withCredentials = true;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
