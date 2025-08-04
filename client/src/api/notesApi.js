import axios from "./axiosInstance";

export const getAllNotes = (page, limit, Class, subject, sort) =>
  axios.get(`/notes`, { params: { page, limit, Class, subject, sort}, withCredentials: true });
