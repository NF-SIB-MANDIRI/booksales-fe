import { API } from "../_api";
import { useJwt } from "react-jwt";

export const register = async ({name, email, password}) => {
    try {
        const {data} = await API.post('/register', {name, email, password})
        return data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const login = async ({email, password}) => {
    try {
        const {data} = await API.post('/login', {email, password})
        return data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const logout = async ({token}) => {
    try {
        const {data} = await API.post('/logout', {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        localStorage.removeItem("accessToken");
        return data
    } catch (error) {
        console.log(error);
        throw error
    }
}


export const useDecodeToken = (token) => {
    const {decodetoken, isExpired} = useJwt(token);

    try {
        if (isExpired) {
            return {
                success: false,
                message: "Token Expired",
                data: null
            }
        }
        return {
            success: true,
            message: "Token Valid",
            data: decodetoken
        }
        
    } catch (error) {
        return {
        success: false,
        message: error.message,
        data: null
        }
    }
}