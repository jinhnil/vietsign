import { Store } from "@reduxjs/toolkit";
import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { logout } from "../../store/slices/adminSlice";

let store: Store;

export const injectStore = (_store: Store) => {
  store = _store;
};

export const defaultHttp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ROOT,
});

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ROOT_NODE,
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const apiToken = localStorage.getItem("access_token");

    if (apiToken) {
      config.headers.Authorization = `Bearer ${apiToken}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    if (error?.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  },
);

export default http;
