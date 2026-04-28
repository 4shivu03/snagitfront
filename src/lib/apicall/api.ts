import axios from "axios";
import { refreshTokenApi } from "./authApi";
export const api = axios.create({
 baseURL: "http://localhost:5270/api",
});

// baseURL: "https://snagit-tn2p.onrender.com/api",
api.interceptors.request.use((config) => {
  const state = JSON.parse(localStorage.getItem("persist:root") || "{}");
  const auth = JSON.parse(state.auth || "{}");
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshTokenApi();
        originalRequest.headers.Authorization = "Bearer " + newToken;
        return api(originalRequest);
      } catch {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);
