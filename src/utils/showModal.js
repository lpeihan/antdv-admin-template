import Antd from 'ant-design-vue';
import { createApp } from 'vue';

import { i18n } from '@/locales';
import router from '@/router';

export const showModal = (Com, props = {}) => {
  let root = document.createElement('div');
  document.body.appendChild(root);
  let app;

  const destroy = () => {
    if (app) {
      app.unmount();
      app = null;
    }

    if (root) {
      document.body.removeChild(root);
      root = null;
    }
  };

  app = createApp(Com, {
    ...props,
    afterClose() {
      destroy();
    },
  });

  const instance = app.use(Antd).use(i18n).use(router).mount(root);

  instance.open();
  return instance;
};
