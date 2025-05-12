import request from '@/utils/request';

export function loginApi(data) {
  return request({
    url: '/api/v1/portal-open/login',
    method: 'post',
    data,
  });
}

export function fetchUserInfoApi() {
  return request({
    url: '/mock/user/info',
    method: 'get',
  });
}

export function transferDeleteApi(data) {
  return request({
    url: '/api/v1/portal/user-account/transfer/delete',
    method: 'post',
    data,
  });
}

export function transferListApi(data) {
  return request({
    url: '/api/v1/portal/user-account/transfer/list',
    method: 'post',
    data,
  });
}

export function transferSaveApi(data) {
  return request({
    url: '/api/v1/portal/user-account/transfer/save',
    method: 'post',
    data,
  });
}

export function fetchUserListApi(data) {
  return request({
    url: '/api/v1/portal/user-account/page',
    method: 'post',
    data,
  });
}

export function userActivityListApi(data) {
  return request({
    url: '/api/v1/portal/user-account/userActivity/list',
    method: 'post',
    data,
  });
}

export function userAssetWithdrawalApproveApi(data) {
  return request({
    url: '/api/v1/portal/user-account/userAsset/withdrawal/approve',
    method: 'post',
    data,
  });
}

export function userAssetHistoryListApi(data) {
  return request({
    url: '/api/v1/portal/user-account/userAssetHistory/list',
    method: 'post',
    data,
  });
}

export function updateSystemConfigApi(data) {
  return request({
    url: '/api/v1/portal/user-account/system/config',
    method: 'post',
    data,
  });
}

export function fetchSystemConfigApi() {
  return request({
    url: '/api/v1/portal-open/sys/config',
    method: 'post',
  });
}
