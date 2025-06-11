import { API } from "../_api";

export const getTransactions = async () => {
    const {data} = await API.get("/transactions",{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
    return data.data
}

export const createTransaction = async (data) => {
    try {
        const response = await API.post("/transactions", data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const showTransaction = async (id) => {
    try {
        const {data} = await API.get(`/transactions/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return data.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const updateTransaction = async (id, data) => {
    try {
        const response = await API.post(`/transactions/${id}`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const deleteTransaction = async (id) => {
    try {
        await API.delete(`/transactions/${id}`,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
    } catch (error) {
        console.log(error);
        throw error
    }
}