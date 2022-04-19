import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8808/api/",
});
