// src/api/axios.js
import axios from "axios";
import { API_ENDPOINTS, ROUTES } from "../utils/constants";

const API_BASE_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:5000"
  }/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

export const get = (url, params) => api.get(url, { params });
export const post = (url, data) => api.post(url, data);
export const put = (url, data) => api.put(url, data);
export const del = (url, config) => api.delete(url, config);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const skipEndpoints = [
      API_ENDPOINTS.LOGIN,
      API_ENDPOINTS.REGISTER,
      API_ENDPOINTS.REFRESH_TOKEN,
      API_ENDPOINTS.LOGOUT,
    ];
    if (skipEndpoints.some((url) => originalRequest.url?.endsWith(url))) {
      return Promise.reject(error);
    }

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) =>
          failedQueue.push({ resolve, reject }),
        )
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.get(API_ENDPOINTS.REFRESH_TOKEN);
        processQueue(null);
        return api(originalRequest); // Retry
      } catch (refreshError) {
        processQueue(refreshError);

        // Optional: Redirect to login if not already there
        if (window.location.pathname !== ROUTES.LOGIN) {
          window.location.href = ROUTES.LOGIN;
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
