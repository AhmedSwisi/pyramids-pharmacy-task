import axios from "axios";

export const axiosRouter = axios.create({baseURL:'http://localhost:8000/api/'})

axiosRouter.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosRouter.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newToken = await refreshAccessToken();
          axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
          return axiosRouter(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );

export interface LoginForm {
    username:string
    password:string
}

export interface RegisterForm {
    username:string
    email:string
    password:string
    password_confirm:string
}

export const login = async (credentials:LoginForm) => {
    try {
        const response = await axiosRouter.post('login/',credentials)
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
            throw error; 
        } else {
            console.error("Unknown error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
}

export const register = async (credentials:RegisterForm) => {
    try {
        const response = await axiosRouter.post('register/',credentials)
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
            throw error; 
        } else {
            console.error("Unknown error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
}

export const refreshAccessToken = async () => {
    try {
      const response = await axiosRouter.post("token/refresh/", {
        refresh: localStorage.getItem("refreshToken"),
      });
      localStorage.setItem("accessToken", response.data.access);
      return response.data.access;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error;
    }
  };

  export const isTokenExpired = (token: string) => {
    const payload = JSON.parse(atob(token.split(".")[1])); 
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime; 
  };