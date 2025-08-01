import axios from "./axiosInstance";

export const getAllNotes = (page, limit) =>
  axios.get(`/notes`, { params: { page, limit }, withCredentials: true });
