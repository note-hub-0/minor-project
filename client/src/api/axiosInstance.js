import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
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
        return axiosInstance(origin)
      } catch (err) {
        window.location.href = "/login?message=session expired"
      }
    }
    return Promise.reject(err)
  }
);

export default axiosInstance