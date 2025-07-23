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
