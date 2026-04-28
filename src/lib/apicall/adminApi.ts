import { api } from "./api";

export const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const toggleUserStatus = async (id: number) => {
  const res = await api.put(`/admin/users/${id}/status`);
  return res.data;
};

export const getRoles = async () => {
  const res = await api.get("/admin/roles");
  return res.data;
};

export const addRole = async (data: any) => {
  return await api.post("/admin/roles", data);
};

export const updateRole = async (id: number, data: any) => {
  return await api.put(`/admin/roles/${id}`, data);
};

export const toggleRoleStatus = async (id: number) => {
  return await api.put(`/admin/roles/${id}/status`);
};

export const getSellers = async () => {
  const res = await api.get("/admin/sellers");
  return res.data;
};

export const approveSeller = async (id: number) => {
  return await api.put(`/admin/seller/${id}/approve`);
};

export const getSellerById = async (id: number) => {
  const res = await api.get(`/admin/seller/${id}`);
  return res.data;
};

export const rejectSeller = async (id: number, reason: string) => {
  return await api.put(`/admin/seller/${id}/reject`, {
    reason,
  });
};

export const getDashboard = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};

export const getUserGrowth = async () => {
  const res = await api.get("/admin/usergrowth");
  return res.data;
};

export const getRoleStats = async () => {
  const res = await api.get("/admin/rolestats");
  return res.data;
};
