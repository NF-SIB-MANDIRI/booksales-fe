import axios from "axios";

// const url = "https://akmal-bc.karyakreasi.id/api",
const url = "http://127.0.0.1:8000";

export const API = axios.create({
    baseURL: `${url}/api`,
})

export const bookStorage = `${url}/storage/books`;
export const authorStorage = `${url}/storage/authors`;
