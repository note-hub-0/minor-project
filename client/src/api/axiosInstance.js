import axios from "axios";
import { logout } from "./authApi";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  console.log("Axios intecepter start"),
  
  (res) => res,
  async (err) => {
    const origin = err.config;

   if (err.response?.status === 401 && !origin._retry) {
  origin._retry = true;
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/user/refreshAccesToken`,
      {},
      { withCredentials: true }
    );
    return axiosInstance(origin);
  } catch (err) {
    await logout()
    localStorage.clear("user")
    window.location.href = "/login?message=session expired"
  }
}

    return Promise.reject(err)
  }
);

export default axiosInstance;