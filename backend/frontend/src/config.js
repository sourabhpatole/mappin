import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://simplemap.herokuapp.com/api/",
});
