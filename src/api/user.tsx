import axios from "./axios";

export const signup = (data: any) => {
    return axios.post('/signup', data);
}
export const signin = (data: any) => {
    return axios.post('/signin', data);
}
export const getAll = () => {
    return axios.get('/user');
}