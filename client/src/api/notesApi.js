import axios from "./axiosInstance";

export const getAllNotes = ({ page, limit, Class, subject, sortBy }) =>
  axios.get(`/notes`, {
    params: {
      page,
      limit,
      Class,
      subject,
      sortBy, 
    },
    withCredentials: true,
  });


export const uploadNotes = (data, config = {}) =>
  axios.post(`/notes/upload`, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: config.onUploadProgress,
  });
