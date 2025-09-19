export enum UserStatus {
  Enabled = 1,
  Disabled = 0,
  Frozen = 2,
}

export const USER_STATUS_MAP = {
  [UserStatus.Enabled]: {
    label: '启用',
    color: 'success',
  },
  [UserStatus.Disabled]: {
    label: '禁用',
    color: 'error',
  },
  [UserStatus.Frozen]: {
    label: '冻结',
    color: 'warning',
  },
};

export const USER_STATUS_OPTIONS = Object.entries(USER_STATUS_MAP).map(([value, meta]) => ({
  label: meta.label,
  value: Number(value),
}));
