import { message } from 'ant-design-vue';
import axios from 'axios';

import { HttpCode } from '@/enums';
import { useUserStore } from '@/store/user';

const request = axios.create({
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
      return data;
    }

    message.error(data.message);

    return Promise.reject(data);
  },
  (err) => {
    message.error(err.message);

    return Promise.reject(err);
  },
);

export default request;
