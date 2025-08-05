import axiosInstance from "./axiosInstance";

export const getAllNotes = ({ page, limit, Class, subject, sortBy }) =>
  axiosInstance.get(`/notes`, {
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
  axiosInstance.post(`/notes/upload`, data, {
    withCredentials: true,

    onUploadProgress: config.onUploadProgress,
  });

  export const deleteNoteById= (noteId) => axiosInstance.delete(`/notes/delete/${noteId}`)
