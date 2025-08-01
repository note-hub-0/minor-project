import axios from "./axiosInstance";

export const login = (data) => axios.post(`/user/login`,data,{withCredentials : true})