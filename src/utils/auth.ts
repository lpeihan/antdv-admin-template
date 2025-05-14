import { useStore } from '@/store';
import storage from '@/utils/storage';

const TOKEN = 'token';

export function hasRole(roles) {
  const store = useStore();

  return store.userInfo.roles.some((role) => roles?.includes(role));
}

export function isLogin() {
  const token = storage.getItem(TOKEN);

  return !!token;
}

export function setToken(token) {
  storage.setItem(TOKEN, token);
}

export function clearToken() {
  storage.removeItem(TOKEN);
}
