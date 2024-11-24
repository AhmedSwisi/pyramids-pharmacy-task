import { login, LoginForm, register, RegisterForm, isTokenExpired} from "@/api/auth";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

interface LoginResponse {
    access: string;
    refresh: string;
}

export const useLogin = (): UseMutationResult<LoginResponse, AxiosError, LoginForm, unknown>=> {
    const navigate = useNavigate()
    return useMutation({
        mutationFn:(credentials:LoginForm) => login(credentials),
        onSuccess:(data) => {
            console.log('Login success',data)
            navigate('/')
        },
        onError: (error) => {
            console.error('Login failed',error)
        }
    })
}

export const useRegister = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn:(credentials:RegisterForm) => register(credentials),
        onSuccess:(data) => {
            console.log('Register success',data)
            navigate('/')
        },
        onError: (error) => {
            console.error('Register failed', error)
        }
    })
}

export const useIsAuthenticated = () => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken && !isTokenExpired(accessToken);
  };