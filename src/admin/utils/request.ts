import axios from 'axios';

import { HttpCode } from '@/admin/enums';
import { useUserStore } from '@/admin/stores';
import { showErrorMessage } from '@/admin/utils';

export const request = axios.create({
  timeout: 20000,
});

request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();

    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`;
    }

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
      return Promise.resolve(data);
    }

    showErrorMessage(data.message);

    return Promise.reject(data);
  },
  (err) => {
    showErrorMessage(err.message);

    return Promise.reject(err);
  },
);
