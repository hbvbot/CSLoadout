import axios from "axios";
import type { AxiosInstance } from "axios";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 5000,
})