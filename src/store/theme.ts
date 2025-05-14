import { defineStore } from 'pinia';

import storage from '@/utils/storage';

const THEME_COLOR_LIST = [
  { name: '默认', color: '#00b96b' },
  { name: '薄暮', color: '#f7234f' },
  { name: '火山', color: '#FA541C' },
  { name: '日暮', color: '#FAAD14' },
  { name: '明青', color: '#13C2C2' },
  { name: '极光绿', color: '#52C41A' },
  { name: '拂晓蓝', color: '#1890FF' },
  { name: '极客蓝', color: '#2F54EB' },
  { name: '酱紫', color: '#722ED1' },
];

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: '',
    colorPrimary: '',
  }),
  actions: {
    setTheme(theme) {
      this.theme = theme;

      storage.setItem('theme', this.theme);
      document.documentElement.setAttribute('data-theme', this.theme);
    },
    setColorPrimary(color) {
      this.colorPrimary = color;

      storage.setItem('colorPrimary', this.colorPrimary);
      document.documentElement.style.setProperty('--primary-color', this.colorPrimary);
    },
    initTheme() {
      const theme = storage.getItem('theme') || 'light';

      this.setTheme(theme);
    },
    initColorPrimary() {
      const colorPrimary = storage.getItem('colorPrimary') || THEME_COLOR_LIST[0].color;

      this.setColorPrimary(colorPrimary);
    },
  },
  getters: {
    themeColorList: () => THEME_COLOR_LIST,
    isDarkTheme: (state) => state.theme === 'dark',
  },
});
