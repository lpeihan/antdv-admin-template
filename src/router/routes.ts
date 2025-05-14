import { DashboardOutlined, SettingOutlined, TableOutlined } from '@ant-design/icons-vue';
import { RouteRecordRaw, RouterView } from 'vue-router';

const routes = [
  {
    path: '/user',
    component: require('@/layouts/UserLayout.vue').default,
    hideInMenu: true,
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () => import('@/views/login/Login.vue'),
      },
    ],
  },
  {
    path: '/',
    component: require('@/layouts/BasicLayout.vue').default,
    meta: { roles: ['admin', 'user'] },
    children: [
      {
        path: '/',
        redirect: '/dashboard/analysis',
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          icon: DashboardOutlined,
          title: 'dashboard',
          roles: ['admin', 'user'],
        },
        component: RouterView,
        children: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            meta: { title: 'analysis', roles: ['admin', 'user'] },
            component: () => import('@/views/dashboard/Analysis.vue'),
          },
        ],
      },
      {
        path: '/table',
        name: 'table',
        meta: { icon: TableOutlined, title: 'table', roles: ['admin', 'user'] },
        component: RouterView,
        children: [
          {
            path: '/table/basic',
            name: 'basicTable',
            meta: { title: 'basicTable', roles: ['admin', 'user'] },
            component: () => import('@/views/table/BasicTable.vue'),
          },
        ],
      },
      {
        path: '/accountSettings',
        name: 'accountSettings',
        meta: {
          icon: SettingOutlined,
          title: 'accountSettings',
          roles: ['admin', 'user'],
        },
        component: () => import('@/views/settings/AccountSettings.vue'),
      },
      {
        path: '/404',
        name: '404',
        hideInMenu: true,
        component: () => import('@/views/404.vue'),
      },
      {
        path: ':pathMatch(.*)',
        redirect: '/404',
      },
    ],
  },
] as RouteRecordRaw[];

export default routes;
