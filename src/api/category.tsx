import axios from "./axios";

export const getAll = () => {
    return axios.get("/categorys");
}