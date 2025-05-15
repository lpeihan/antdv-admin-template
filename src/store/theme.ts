import { theme } from 'ant-design-vue';
import { defineStore } from 'pinia';

import storage from '@/utils/storage';

const THEME_COLOR_LIST = [
  '#00b96b',
  '#f7234f',
  '#FA541C',
  '#FAAD14',
  '#13C2C2',
  '#52C41A',
  '#1890FF',
  '#2F54EB',
  '#722ED1',
];

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

const isDarkTheme = (theme: Theme) => theme === Theme.Dark;

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: storage.getItem('theme') || Theme.Light,
    colorPrimary: storage.getItem('colorPrimary') || THEME_COLOR_LIST[0],
  }),
  actions: {
    setTheme(theme) {
      this.theme = theme;

      storage.setItem('theme', this.theme);
      document.documentElement.setAttribute('data-theme', this.theme);
    },
    toggleTheme() {
      this.setTheme(this.isDarkTheme ? Theme.Light : Theme.Dark);
    },
    setColorPrimary(color) {
      this.colorPrimary = color;

      storage.setItem('colorPrimary', this.colorPrimary);
      document.documentElement.style.setProperty('--primary-color', this.colorPrimary);
    },
    initTheme() {
      this.setTheme(this.theme);
    },
    initColorPrimary() {
      this.setColorPrimary(this.colorPrimary);
    },
  },
  getters: {
    themeColorList: () => THEME_COLOR_LIST,
    isDarkTheme: (state) => isDarkTheme(state.theme),
    antdThemeConfig: (state) => ({
      algorithm: isDarkTheme(state.theme) ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: state.colorPrimary,
        controlHeight: 34,
      },
    }),
  },
});
