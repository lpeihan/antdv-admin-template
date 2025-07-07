import { useStorage } from '@vueuse/core';

import { useUserStore } from '@/store/user';

const TOKEN = 'token';

const tokenStorage = useStorage(TOKEN, '');

export function hasRole(roles) {
  const userStore = useUserStore();

  if (isLogin()) {
    return userStore.userInfo.roles.some((role) => roles?.includes(role));
  }

  return false;
}

export function isLogin() {
  return !!getToken();
}

export function getToken() {
  return tokenStorage.value;
}

export function setToken(token) {
  tokenStorage.value = token;
}

export function clearToken() {
  tokenStorage.value = '';
}
