import axios from "axios";

const API_URL =
  (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api";
const REFRESH_ENDPOINT = API_URL+"/user/refreshToken";
const LOGIN_ROUTE = "/login";

// Define once at module level
const NO_REFRESH_ENDPOINTS = ["/user/login", "/user/logout", REFRESH_ENDPOINT];

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 10000,
});

// --- Token Refresh Logic ---
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token),
  );
  failedQueue = [];
};

const refreshAuthToken = async () => {
  await api.get(REFRESH_ENDPOINT);
};

const shouldAttemptRefresh = (url) =>
  !NO_REFRESH_ENDPOINTS.some((endpoint) => url?.includes(endpoint));

const enqueueRequest = () =>
  new Promise((resolve, reject) => failedQueue.push({ resolve, reject }));

// --- Request Interceptor (optional: add auth header) ---
api.interceptors.request.use((config) => {
  // Uncomment if using access tokens:
  // const token = localStorage.getItem("accessToken");
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- Response Interceptor ---
api.interceptors.response.use(
  // Remove redundant success handler
  undefined,
  async (error) => {
    const { config: originalRequest, response } = error;

    // Network error
    if (!response) {
      return Promise.reject(
        Object.assign(
          new Error("Network Error. Please check your connection."),
          { originalError: error },
        ),
      );
    }

    const isRefreshRequest = originalRequest.url?.includes(REFRESH_ENDPOINT);

    // 401 handling with token refresh
    if (
      response.status === 401 &&
      !originalRequest._retry &&
      !isRefreshRequest &&
      shouldAttemptRefresh(originalRequest.url)
    ) {
      if (isRefreshing) {
        return enqueueRequest().then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshAuthToken();
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        if (window.location.pathname !== LOGIN_ROUTE) {
          window.location.href = LOGIN_ROUTE;
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

// --- Exported Methods (with full config support) ---
export const get = (url, params, config = {}) =>
  api.get(url, { ...config, params });

export const post = (url, data, config = {}) => api.post(url, data, config);

export const put = (url, data, config = {}) => api.put(url, data, config);

export const patch = (url, data, config = {}) => api.patch(url, data, config);

export const del = (url, config = {}) => api.delete(url, config);

export default api;
