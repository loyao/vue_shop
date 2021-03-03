import request from '@/utils/request'

export function menu() {
  return request({
    url: '/api/system/menu',
    method: 'get',
  })
}
