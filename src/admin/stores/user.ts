import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

import { fetchUserInfoApi, loginApi } from '@/admin/api';
import { STORAGE_KEY } from '@/admin/constants';
import { RoleName } from '@/admin/enums';
import { router } from '@/admin/router';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: useStorage(STORAGE_KEY.token, ''),
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

      router.push('/auth/login');
    },
    hasRole(roles: RoleName[] = []) {
      if (!this.token) {
        return false;
      }

      return this.userInfo.roles.some((role) => roles.includes(role));
    },
  },
});
