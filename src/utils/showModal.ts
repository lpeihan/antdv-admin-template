import Antd from 'ant-design-vue';
import { createApp } from 'vue';

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

  const vm = app.use(Antd).mount(root);

  vm.showModal?.();

  return vm;
};
