import axios from "./axios";

export const getAll = () => {
    return axios.get("/categorys");
}
export const get = (id: number | string | undefined) => {
    return axios.get(`/category/${id}`);
}