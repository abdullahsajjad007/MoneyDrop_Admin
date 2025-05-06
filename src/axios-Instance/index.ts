import axios from "axios";
import { baseURL } from "./constants";
import { getLoginToken } from "../storage";

const config = { baseURL: baseURL };
const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getLoginToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
