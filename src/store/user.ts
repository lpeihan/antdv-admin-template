import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

import { fetchUserInfoApi, loginApi } from '@/api';
import router from '@/router';
import { RoleName } from '@/types';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: useStorage('token', ''),
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

      this.token = res.data.token;
      await this.fetchUserInfo();
    },
    logout() {
      this.token = '';
      this.userInfo = null;

      router.push('/user/login');
    },
    hasRole(roles: RoleName[] = []) {
      if (!this.token) {
        return false;
      }

      return this.userInfo.roles.some((role) => roles.includes(role));
    },
  },
});
