import axios from "./axios";

export const create = (data: any) => {
    return axios.post("/order", data);
}
export const createOrderDetail = (data: any) => {
    return axios.post("/orderDetail", data);
}