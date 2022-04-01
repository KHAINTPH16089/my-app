import React from "react";
import axios from "./axios";

export const getCategory = () => {
    return axios.get(`/categories`);
}
export const getCategorys = (id: any) => {
    return axios.get(`/categories/${id}`);
}
export const createCategory = (data: any) => {
    return axios.post(`/categories`, data);
}
export const removeCategory = (id: any) => {
    return axios.delete(`/categories/${id}`, );
}
export const updateCategory = (id:any,data: any) => {
    return axios.put(`/categories/${id}`, data);
}