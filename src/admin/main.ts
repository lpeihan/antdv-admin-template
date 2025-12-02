import Antd from 'ant-design-vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from '@/admin/App.vue';
import { installComponents } from '@/admin/components';
import { i18n } from '@/admin/locales';
import { router } from '@/admin/router';
import { useThemeStore } from '@/admin/stores';

import 'ant-design-vue/dist/reset.css';
import '@/admin/styles/index.less';
import '@/admin/styles/tailwind.css';

window.env = process.env;

const bootstrap = () => {
  const pinia = createPinia();
  const app = createApp(App);

  app.use(Antd).use(i18n).use(pinia).use(router).use(installComponents);

  const themeStore = useThemeStore();
  themeStore.initTheme();
  themeStore.initColorPrimary();

  app.mount('#app');
};

bootstrap();
