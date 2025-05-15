import { useStore } from '@/store';
import storage from '@/utils/storage';

const TOKEN = 'token';

export function hasRole(roles) {
  const store = useStore();

  if (isLogin()) {
    return store.userInfo.roles.some((role) => roles?.includes(role));
  }

  return false;
}

export function isLogin() {
  return !!getToken();
}

export function getToken() {
  return storage.getItem(TOKEN);
}

export function setToken(token) {
  storage.setItem(TOKEN, token);
}

export function clearToken() {
  storage.removeItem(TOKEN);
}
