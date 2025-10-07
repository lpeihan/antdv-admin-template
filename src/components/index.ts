import Icon from './Icon.vue';
import SvgIcon from './SvgIcon.vue';

export { Icon, SvgIcon };

export const installComponents = (app) => {
  app.component('Icon', Icon);
  app.component('SvgIcon', SvgIcon);
};
