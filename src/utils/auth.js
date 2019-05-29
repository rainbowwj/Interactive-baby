import Cookies from 'js-cookie'

// const TokenKey = 'Admin-token'
const TokenKey = 'x-auth-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log(TokenKey, token, Cookies.set(TokenKey, token))
  return Cookies.set(TokenKey, token, { expires: 7 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}