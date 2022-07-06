import axios from "axios";

const instance = axios.create({
    baseURL:"https://react-nodejs.vercel.app/api"
})

export default instance;