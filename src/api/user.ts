import { request } from '@/utils';

export function loginApi(data) {
  return request({
    url: '/mock/user/login',
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

export function fetchUserListApi(params) {
  return request({
    url: '/mock/user/list',
    method: 'get',
    params,
  });
}
