import axiosInstance from "./axiosInstance";

export const login = (data) => axiosInstance.post(`/user/login`,data,{withCredentials : true})

export const getCurrectUser = () => axiosInstance.get(`/user/get/currect-user`,{withCredentials : true})

export const logout = () => axiosInstance.post(`/user/logout`,{},{withCredentials : true})

export const signup = (data) => axiosInstance.post(`/user/register`,data,{withCredentials : true})

export const me = () => axiosInstance.get(`/user/me`,{withCredentials : true})