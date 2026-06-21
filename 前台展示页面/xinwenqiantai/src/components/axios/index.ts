import axios from 'axios';

const http = axios.create({
  baseURL: '',
  timeout: 5000
});

http.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

http.interceptors.response.use(
  (response) => {
    console.log('请求成功');
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log('未授权，token过期，跳转登录');
      localStorage.removeItem('token');
      window.location.href = '/#/denglu';
    } else if (error.response?.status === 500) {
      console.log('服务器内部错误');
    } else {
      console.log('其他错误', error.message);
    }
    return Promise.reject(error)
  }
)

export default http;
