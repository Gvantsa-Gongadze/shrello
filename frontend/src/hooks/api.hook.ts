import axios from "axios";
import { useCallback } from "react";
import { AuthUser } from "../types";

export const LOCAL_STORAGE_TOKEN_KEY = 'token';

export interface RegisterValues {
    password: string
    email: string
    firstName: string
    lastName: string
}
export interface LoginValues {
    password: String;
    remember: Boolean;
    username: String;
}
export function useApi() {
    const getAuthToken = () => localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

    const fetchUser = async () => {
        try {
            const response = await axios.get<AuthUser>('http://localhost:3000/users/token', {
                headers: {
                    'Token': getAuthToken()
                }
            })

            return response.data
        } catch(e) {
            console.error(e)
            return null
        }
    }

    const register = async (values: RegisterValues) => {
        try {
            const user = await axios.post("http://localhost:3000/users", values);
            localStorage.setItem('token', user.data.token);
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const login = async (values: LoginValues) => {

        try {
            const user = await axios.put(`http://localhost:3000/users`, {
                password: values.password,
                email: values.username
            })
            localStorage.setItem('token', user.data.token);
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    return {
        fetchUser: useCallback(fetchUser, []),
        register: useCallback(register, []),
        login: useCallback(login, [])
    }
}