import { defineStore } from 'pinia';

import { fetchUserInfoApi, loginApi } from '@/api';
import router from '@/router';
import { clearToken, setToken } from '@/utils/auth';

export const useStore = defineStore('store', {
  state: () => {
    return {
      userInfo: null,
    };
  },
  actions: {
    async fetchUserInfo() {
      const res = await fetchUserInfoApi();

      this.userInfo = res.data;
    },
    async login(data) {
      const res = await loginApi(data);

      setToken(res.data.token);

      await this.fetchUserInfo();
    },
    logout() {
      clearToken();
      this.userInfo = null;

      router.push('/user/login');
    },
  },
});
