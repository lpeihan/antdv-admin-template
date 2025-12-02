import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: {
      auth: true,
    },
    component: () => import('@/app/views/home/Home.vue'),
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      auth: true,
    },
    component: () => import('@/app/views/user/User.vue'),
  },
];

export default routes;
