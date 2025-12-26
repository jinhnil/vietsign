import { Store } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "../../store/slices/adminSlice";

let store: Store;

export const injectStore = (_store: Store) => {
  store = _store;
};

export const defaultHttp = axios.create();
const http = axios.create();

http.interceptors.request.use(
  (config) => {
    const apiToken = localStorage.getItem("access_token");

    // Only set Authorization header if token exists and is valid
    if (apiToken && apiToken !== "undefined" && apiToken !== "null") {
      config.headers.Authorization = `Bearer ${apiToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      store.dispatch(logout());
      // Redirect về trang chủ khi token hết hạn
      if (typeof window !== 'undefined') {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  },
);

export default http;

