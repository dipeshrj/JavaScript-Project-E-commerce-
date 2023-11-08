import axios from "axios";

export const $axios = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 1000,
});

// Add a request interceptor
$axios.interceptors.request.use(function (config) {
    // Do something before request is sent
  const accesstoken = localStorage.getItem('accesstoken')
  if (accesstoken) {
    config.headers.Authorization = `Bearer ${accesstoken}`
  }
    return config;
  });