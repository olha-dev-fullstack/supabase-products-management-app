import axios from "axios";
export const requestClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
