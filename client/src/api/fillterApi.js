import axios from "./axiosInstance"

export const getClasses = () => axios.get("/notes/class")
export const getSubjectByClass = (Class) => axios.get(`/notes/class/subject?Class=${Class}`)