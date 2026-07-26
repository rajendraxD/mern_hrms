import axios from "axios";

/**
 * Lazily-injected store reference to break the circular dependency:
 *   store/index.js → userSlice.js → axios.js → store/index.js ✗
 *
 * Call injectStore(store) once the store is created.
 */
let store = null;
export const injectStore = (_store) => {
  store = _store;
};

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // send httpOnly cookie
});

// Inject access token on every request
api.interceptors.request.use((config) => {
  const token = store?.getState().user.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

// On 401: refresh once, then retry queued requests
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      });
    }
    original._retry = true;
    isRefreshing = true;
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/user/refreshToken",
        { withCredentials: true },
      );
      store.dispatch({
        type: 'user/setCredentials',
        payload: { accessToken: data.accessToken, user: data.user },
      });
      processQueue(null, data.accessToken);
      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(original);
    } catch (err) {
      processQueue(err, null);
      store.dispatch({ type: 'logout' });
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
