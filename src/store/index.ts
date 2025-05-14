import { defineStore } from 'pinia';

import { fetchUserInfoApi, loginApi } from '@/api';
import router from '@/router';
import { clearToken, setToken } from '@/utils/auth';
import { Theme, THEME_COLOR_LIST } from '@/utils/constants';
import storage from '@/utils/storage';

export const useStore = defineStore('store', {
  state: () => {
    return {
      userInfo: null,
      theme: storage.getItem('theme') || Theme.Dark,
      colorPrimary: storage.getItem('colorPrimary') || THEME_COLOR_LIST[0].color,
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
    initTheme() {
      this.setTheme(this.theme);
      this.setColorPrimary(this.colorPrimary);
    },
    setTheme(theme) {
      this.theme = theme;

      storage.setItem('theme', this.theme);
      document.documentElement.setAttribute('data-theme', this.theme);
    },
    setColorPrimary(colorPrimary) {
      this.colorPrimary = colorPrimary;

      storage.setItem('colorPrimary', this.colorPrimary);
      document.documentElement.style.setProperty('--primary-color', this.colorPrimary);
    },
  },
  getters: {
    isDarkTheme: (state) => state.theme === Theme.Dark,
  },
});
