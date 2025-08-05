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

    onUploadProgress: config.onUploadProgress,
  });

  // export const deleteNoteById= () => axios.delete()
