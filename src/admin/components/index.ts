import ModalManager from './ModalManager.vue';
import SvgIcon from './SvgIcon.vue';

export { SvgIcon, ModalManager };

export const installComponents = (app) => {
  app.component('SvgIcon', SvgIcon);
};
