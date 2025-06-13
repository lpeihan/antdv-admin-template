import { DashboardOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons-vue';
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
          title: '仪表盘',
        },
        component: RouterView,
        children: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            meta: { title: '分析' },
            component: () => import('@/views/dashboard/Analysis.vue'),
          },
        ],
      },
      {
        path: '/userManagement',
        name: 'userManagement',
        meta: { icon: UserOutlined, title: '用户管理' },
        component: RouterView,
        children: [
          {
            path: '/userManagement/userList',
            name: 'userList',
            meta: { title: '用户列表' },
            component: () => import('@/views/userManagement/UserList.vue'),
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        meta: {
          icon: SettingOutlined,
          title: 'profile',
        },
        component: () => import('@/views/profile/Profile.vue'),
        hideInMenu: true,
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
