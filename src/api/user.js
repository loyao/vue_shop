import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return request({
    url: '/api/user/userInfo',
    method: 'get',
    params:  id
  })
}


export function userList(data) {
  return request({
    url: '/api/user/userList',
    method: 'get',
    params: data
  })
}

//修改用户状态
export function changeUserStatus(data) {
  return request({
    url: '/api/user/changeUserStatus',
    method: 'post',
    data
  })
}

//
export function addUser(data) {
  return request({
    url: '/api/user/addUser',
    method: 'post',
    data
  })
}

//更新
export function updateUser(data) {
  return request({
    url: '/api/user/editUser',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/api/user/deleteUser',
    method: 'delete',
    data
  })
}