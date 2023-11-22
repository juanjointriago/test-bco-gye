import axios from "axios";


export const testAPI = axios.create({
    baseURL: "http://localhost:8090/api"
})

testAPI.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config;
})