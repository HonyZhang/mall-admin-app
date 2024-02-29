import axios from 'axios';

const instance = axios.create({
  baseURL: ' https://mallapi.duyiedu.com/',
});

instance.interceptors.request.use(
  // 在发送请求之前做些什么
  (config) => (config),
  (error) => {
    // 对请求错误做些什么
    Promise.reject(error);
  },
);

instance.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (response.data.status === 'fail') {
    return Promise.reject(response.data.msg);
  }
  return response.data.data;
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  Promise.reject(error);
});

export default instance;
