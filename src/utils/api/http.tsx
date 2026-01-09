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
    // Không redirect nếu lỗi 401 đến từ API login (để hiển thị thông báo lỗi)
    if (error?.response?.status === 401 && !error.config.url.includes("/login")) {
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

