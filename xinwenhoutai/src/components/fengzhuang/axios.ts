import axios from "axios";

export const http = axios.create({
  baseURL: '',
  timeout: 5000
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 只有非公开接口的 401 才跳转登录页
    const publicPaths = ['/api/home-stats', '/api/tongji-data', '/api/news-detail'];
    const isPublicApi = error.config && publicPaths.some(p => error.config.url && error.config.url.includes(p));
    
    if (error.response?.status === 401 && !isPublicApi) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      window.location.href = '/#/login';
    }
    return Promise.reject(error);
  }
);
