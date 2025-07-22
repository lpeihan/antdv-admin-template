import { UserStatus } from './enums';

function withPrefix(key) {
  return `admin_${key}`;
}

export const STORAGE_KEY = {
  token: withPrefix('token'),
  collapsed: withPrefix('collapsed'),
  theme: withPrefix('theme'),
  colorPrimary: withPrefix('colorPrimary'),
  locale: withPrefix('locale'),
};

export const USER_STATUS_OPTIONS = [
  {
    label: '启用',
    value: UserStatus.Enabled,
  },
  {
    label: '禁用',
    value: UserStatus.Disabled,
  },
];
