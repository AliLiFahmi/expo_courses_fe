import axios from "axios";
import { getSecureItem } from "../hooks/useSecureStore";

// Create axios instance with custom config
const api = axios.create({
  baseURL:
    process.env.API_BASE_URL || "https://courses.lv.alifahmi.my.id/public/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
api.interceptors.request.use(
  async (config) => {
    // Get token from secure storage
    const token = await getSecureItem("token");

    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response) {
      // Server responded with error status
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error("Request error:", error.request);
    } else {
      // Error in request setup
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
