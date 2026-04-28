import { api } from "./api";
import { store } from "@/store";
import { setAuth, logout } from "@/store/slices/authSlice";

const setCookie = (token: string) => {
  document.cookie = `token=${token}; path=/`;
};

export const loginUser = async (data: any) => {
  const res = await api.post("/auth/login", data);
  const { token, refreshToken, user } = res.data;
  store.dispatch(setAuth({ token, refreshToken, user }));
  setCookie(token);
  return res.data;
};

export const signupUser = async (data: any) => {
  return await api.post("/auth/signup", {...data,role: "P",IsActive:true});
};

export const refreshTokenApi = async () => {
  const state = store.getState();
  const refreshToken = state.auth.refreshToken;
  const res = await api.post("/auth/refresh", { refreshToken });
  const { token, refreshToken: newRT, user } = res.data;
  store.dispatch(setAuth({ token, refreshToken: newRT, user }));
  setCookie(token);
  return token;
};

export const logoutUser = async () => {
  const state = store.getState();
  const refreshToken = state.auth.refreshToken;
  await api.post("/auth/logout", { refreshToken });
  store.dispatch(logout());
  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

export const createSeller = async (data: any) => {
  const res = await api.post("/auth/seller", data);
  return res.data;
};

export const sendOtp = async (email: string) => {
  return await api.post("/auth/sendotp", { email });
};

export const resetPassword = async (data: any) => {
  return await api.post("/auth/resetpassword", data);
};