import axios from "axios";

const apiURL = "https://jsonplaceholder.typicode.com";

export const axiosOpen = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const axiosSecure = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  },
});

// using interceptors

export const axiosNonSecureInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
});

export const axiosSecureInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
});

axiosSecureInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.userToken
      ? localStorage.getItem("userToken")
      : null;
    config.headers.Authorization = `Bearer ${userToken}`;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
