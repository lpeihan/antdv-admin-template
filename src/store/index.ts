import { defineStore } from 'pinia';

import { fetchSystemConfigApi, fetchUserInfoApi, loginApi } from '@/api';
import router from '@/router';
import { clearToken, setToken } from '@/utils/auth';
import { Theme, THEME_COLOR_LIST } from '@/utils/constants';
import storage from '@/utils/storage';
import { connectWallet } from '@/web3';

export const useStore = defineStore('store', {
  state: () => {
    return {
      userInfo: {
        roles: [],
        nickname: 'admin',
      },
      theme: storage.getItem('theme') || Theme.Dark,
      themeColor: storage.getItem('themeColor') || THEME_COLOR_LIST[0].color,
      walletAddress: '',
      systemConfig: [],
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

      // await this.fetchUserInfo();
    },
    logout() {
      clearToken();
      this.userInfo = null;

      router.push('/user/login');
    },
    initTheme() {
      this.setTheme(this.theme);
      this.setThemeColor(this.themeColor);
    },
    setTheme(theme) {
      this.theme = theme;

      storage.setItem('theme', this.theme);
      document.documentElement.setAttribute('data-theme', this.theme);
    },
    setThemeColor(themeColor) {
      this.themeColor = themeColor;

      storage.setItem('themeColor', this.themeColor);
      document.documentElement.style.setProperty('--primary-color', this.themeColor);
    },
    async connectWallet() {
      const walletAddress = await connectWallet();
      this.walletAddress = walletAddress;

      return walletAddress;
    },
    async fetchSystemConfig() {
      const res = await fetchSystemConfigApi();

      this.systemConfig = res.data;
    },
  },
  getters: {
    isDarkTheme: (state) => state.theme === Theme.Dark,
    ownerWallet: (state) => {
      const config = state.systemConfig.find((item) => item.paramName === '质押钱包');

      return config?.parmaValue || '';
    },
  },
});
