import Antd from 'ant-design-vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from '@/App.vue';
import { i18n } from '@/locales';
import router from '@/router';
import { useStore } from '@/store';

import 'ant-design-vue/dist/reset.css';
import '@/styles/index.less';

window.env = process.env;

const bootstrap = () => {
  const pinia = createPinia();
  const app = createApp(App);

  app.use(Antd).use(i18n).use(pinia).use(router);

  const store = useStore();
  store.initTheme();

  app.mount('#app');
};

bootstrap();
