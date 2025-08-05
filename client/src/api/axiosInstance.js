import axios from "axios";
import { logout } from "./authApi";

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log("REQUEST ERROR:", error);
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // console.log("RESPONSE ERROR:", error);

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // console.log("🔁 Trying to refresh access token...");
        const res = await axios.post(
          `${baseURL}/user/refreshAccesToken`,
          {},
          {
            withCredentials: true,
          }
        );
        // console.log(res);
        

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token failed", refreshError);
        localStorage.clear("user");
        await logout();
        window.location.href = "/login?message=Session Expired";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
