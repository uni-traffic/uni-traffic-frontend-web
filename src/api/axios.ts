import axios from "axios";

const api = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? process.env.BACKEND_URL : "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
});

/**
 * TODO: Implement cookie storing of auth token (jwt)
 * api.interceptors.request.use(
 *   async (config) => {
 *     const token = await getItem("AUTH_TOKEN");
 *     if (token) {
 *       config.headers["Authorization"] = `Bearer ${token}`;
 *     }
 *
 *     return config;
 *   },
 *   (error) => {
 *     return Promise.reject(error);
 *   }
 * );
 */

export default api;
