import { ProfileOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons-vue';
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
        redirect: '/userManagement',
      },
      {
        path: '/userManagement',
        name: 'userManagement',
        meta: {
          icon: UserOutlined,
          title: '用户管理',
          roles: ['admin', 'user'],
        },
        component: () => import('@/views/userManagement/UserManagement.vue'),
      },
      {
        path: '/settings',
        name: 'settings',
        meta: {
          icon: SettingOutlined,
          title: '配置管理',
          roles: ['admin', 'user'],
        },
        component: () => import('@/views/settings/Settings.vue'),
      },
      {
        path: '/income',
        name: 'incomeRoot',
        meta: {
          icon: ProfileOutlined,
          title: '收益管理',
          roles: ['admin', 'user'],
        },
        component: RouterView,
        children: [
          {
            path: '/income/income',
            name: 'income',
            meta: { title: '收益列表', roles: ['admin', 'user'] },
            component: () => import('@/views/income/Income.vue'),
          },
          {
            path: '/income/staking',
            name: 'staking',
            meta: { title: '质押列表', roles: ['admin', 'user'] },
            component: () => import('@/views/income/Staking.vue'),
          },
          {
            path: '/income/exchange',
            name: 'exchange',
            meta: { title: '兑换列表', roles: ['admin', 'user'] },
            component: () => import('@/views/income/Exchange.vue'),
          },
          {
            path: '/income/withdraw',
            name: 'withdraw',
            meta: { title: '提现列表', roles: ['admin', 'user'] },
            component: () => import('@/views/income/Withdraw.vue'),
          },
          {
            path: '/income/transfer',
            name: 'transfer',
            meta: { title: '划转列表', roles: ['admin', 'user'] },
            component: () => import('@/views/income/Transfer.vue'),
          },
        ],
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
