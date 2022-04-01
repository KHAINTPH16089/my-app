import React from "react";
import axios from "./axios";

export const getProducts = () => {
    return axios.get(`/products`);
}
export const getProduct = (id: any) => {
    return axios.get(`/products/${id}`);
}
export const createProducts = (data: any) => {
    return axios.post(`/products`, data);
}
export const removeProducts = (id: any) => {
    return axios.delete(`/products/${id}`, );
}
export const updateProducts = (id:any,data: any) => {
    return axios.put(`/products/${id}`, data);
}
