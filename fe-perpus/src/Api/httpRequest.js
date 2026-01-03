import axios from "axios";

const apiUrl = "http://127.0.0.1/api";

const api = axios.create({
  baseURL: `${apiUrl}`, // Ganti dengan URL API kamu
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// --- Request Interceptor ---
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response Interceptor ---
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika error 401 dan bukan karena request refresh token itu sendiri
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        // Panggil endpoint refresh token
        const response = await axios.post(`${apiUrl}/auth/refresh`, {
          token: refreshToken,
        });

        const { accessToken } = response.data;

        // Simpan token baru
        localStorage.setItem("accessToken", accessToken);

        // Update header request yang gagal tadi dan coba lagi
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Jika refresh token juga gagal/expired, paksa logout
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
