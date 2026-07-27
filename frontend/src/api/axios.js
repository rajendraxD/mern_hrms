import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

async function getStore() {
  const { default: store } = await import("../app/store");
  return store;
}

api.interceptors.request.use(async (config) => {
  const store = await getStore();
  const token = store.getState().user.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

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
      const store = await getStore();
      store.dispatch({
        type: "user/setCredentials",
        payload: { accessToken: data.accessToken, user: data.user },
      });
      processQueue(null, data.accessToken);
      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(original);
    } catch (err) {
      const store = await getStore();
      processQueue(err, null);
      store.dispatch({ type: "user/logout" });
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
