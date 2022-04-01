import axios from "./axios";
import { isAuthenticate } from "../utils/localstorage";


if(localStorage.getItem('user')){
    var users = JSON.parse(localStorage.getItem('user') || '');
}

export const getProductsLimit = (limit: number | undefined) => {
    return axios.get(`/products?limit=${limit ? limit : ""}`);
}
export const getProductsPage = (page: number | undefined) => {
    return axios.get(`/products?page=${page ? page : ""}`);
}
export const getProducts = () => {
    return axios.get(`/products`);
}

export const getProduct = (_id: number | string| undefined) => {
    return axios.get(`/product/${_id}`);
}

export const createProduct = (data: any) => {
    return axios.post(`/products/${users.user._id}`, data,
    {
        headers: {
            "Authorization": `Bearer ${users.token}`
        }
    });
}
export const remove = (id: string | undefined) => {
    return axios.delete(`/product/${id}/${users.user._id}`,
        {
            headers: {
                "Authorization": `Bearer ${users.token}`
            }
        }
    )
}
export const update = (product: any, id: string | undefined) => {
    return axios.put(`/product/${id}/${users.user._id}`, product,
        {
            headers: {
                "Authorization": `Bearer ${users.token}`
            }
        }
    );
}