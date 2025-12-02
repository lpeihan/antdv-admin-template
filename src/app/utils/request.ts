import axios from 'axios';
import { showToast } from 'vant';

import { HttpCode } from '@/app/enums';

export const request = axios.create({
  timeout: 30000,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    Promise.reject(err);
  },
);

request.interceptors.response.use(
  (res) => {
    const { data } = res;

    if (data.code === HttpCode.Success) {
      return data;
    }

    showToast(data.message);

    return Promise.reject(data);
  },
  (err) => {
    showToast(err.message);

    return Promise.reject(err);
  },
);
