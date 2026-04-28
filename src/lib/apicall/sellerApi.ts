import { api } from "./api";

export const addProduct = (data: any) => api.post("/seller/product", data);

export const updateProduct = (id: number, data: any) => api.put(`/seller/product/${id}`, data);

export const getMyProducts = () => api.get("/seller/my-products");