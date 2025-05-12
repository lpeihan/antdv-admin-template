import { message } from 'ant-design-vue';
import axios from 'axios';

import router from '@/router';
import { getToken } from '@/utils/auth';
import { CODE_SUCCESS, CODE_TOKEN_EXPIRED } from '@/utils/constants';

const request = axios.create({
  timeout: 20000,
  baseURL: process.env.NODE_ENV === 'production' ? '/' : 'http://97.74.94.148:8080/',
  toast: true,
});

request.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers['Authorization'] = token;
    }

    return config;
  },
  (err) => {
    Promise.reject(err);
  },
);

request.interceptors.response.use(
  (res) => {
    const { config, data } = res;

    if (data.code === CODE_SUCCESS) {
      return data;
    }

    if (config.toast) {
      message.error(data.message);
    }

    console.log('token 过期', data.code, CODE_TOKEN_EXPIRED);

    if (data.code === CODE_TOKEN_EXPIRED) {
      router.push('/user/login');
      return;
    }

    return Promise.reject(data);
  },
  (err) => {
    const { config } = err;

    if (config.toast) {
      message.error(err.message);
    }

    return Promise.reject(err);
  },
);

export default request;
