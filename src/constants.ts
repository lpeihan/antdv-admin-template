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
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
];
