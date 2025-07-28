export * from './loading';

import BottomBar from './bottomBar/BottomBar.vue';

export default {
  install(app) {
    app.component('BottomBar', BottomBar);
  },
};
