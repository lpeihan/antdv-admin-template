export * from './loading';

import BottomBar from './bottomBar/BottomBar.vue';
import SvgIcon from './SvgIcon.vue';
import TopBar from './TopBar.vue';

export default {
  install(app) {
    app.component('BottomBar', BottomBar);
    app.component('TopBar', TopBar);
    app.component('SvgIcon', SvgIcon);
  },
};
