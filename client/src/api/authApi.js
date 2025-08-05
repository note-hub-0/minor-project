import axios from "./axiosInstance";

export const login = (data) => axios.post(`/user/login`,data,{withCredentials : true})

export const getCurrectUser = () => axios.get(`/user/get/currect-user`,{withCredentials : true})

export const logout = () => axios.post(`/user/logout`,{},{withCredentials : true})