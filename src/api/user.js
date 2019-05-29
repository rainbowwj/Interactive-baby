import request from '@/utils/request'
import fs from 'fs'
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return new Promise((resolve, reject) => {
    resolve({
      roles: ['admin'],
      introduction: 'I am a super administrator',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin'
    })
  })
}

// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }
