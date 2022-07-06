import axios from "./axios";
import { isAuthenticate } from "../utils/localstorage";


if(localStorage.getItem('user')){
    var users = JSON.parse(localStorage.getItem('user') || '');
}

export const getProductsPage = (page: number | undefined, perPage: number | undefined, sortBy: string | null, search: string | null, price: number | string | null) => {
    return axios.get(`/products?page=${page ? page : null}&perPage=${perPage ? perPage : null}${sortBy != null ? `&sortBy=${sortBy}` : ''}${search != null ? `&search=${search}` : ''}${price != null ? `&price=${price}` : '&price=1'}`);
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
export const upload = (base64: any) => {
    return fetch("http://localhost:3002/api/upload",{
        method: "POST",
        body: JSON.stringify({data: base64}),
        headers:{ "Content-type": "application/json"}
    })
}
export const removeFile = (id: string | undefined) => {
    return axios.get(`/delete/${id}`);
}