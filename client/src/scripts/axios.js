const api = axios.create({
  baseURL: `http://localhost:3000/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
const baseUrl = `http://localhost:3000/api/v1`;

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const origin = err.config;

    if (err.response?.status === 401 && !origin._retry) {
      origin._retry = true;
      try {
        await axios.post(
          `${baseUrl}/user/refreshAccessToken`,
          {},
          { withCredentials: true }
        );
        const newAccessToken = res.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(origin);
      } catch (err) {
        localStorage.removeItem("accessToken");
        window.location.href = "../pages/login.html?message=session expired";
      }
    }
    return Promise.reject(err);
  }
);
