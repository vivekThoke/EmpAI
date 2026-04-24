import axios from "axios";
import { useRouter } from "next/navigation";

const api = axios.create({
    baseURL: "https://localhost:7027/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status == 401) {
            localStorage.removeItem("token");
            window.location.href = "/login"
        }
        return Promise.reject(error);
    }
)

export default api;