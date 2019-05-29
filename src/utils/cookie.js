/**
 * 封装cookie 
 */
const CookieUtil = {
  /**
   * 设置cookie
   * @param {String} name 存储的key
   */
  set: (name, value, expires, domain, path, secure) => {
    let cookieText = ''
    cookieText += encodeURIComponent(name) + '=' + encodeURIComponent(value)

    if (expires instanceof Date) {
      cookieText += '; expires=' + expires.toGMTString()
    }
    if (path) {
      cookieText += '; path=' + path
    }
    if (domain) {
      cookieText += '; domain=' + domain
    }
    if (secure) {
      cookieText += '; secure'
    }

    document.cookie = cookieText
  },
  // name=value; expires=expiration_time; path=domain_path; domain=domain_name; secure
  // 获取cookie
  get: (name) =>{
    let cookieName = encodeURIComponent(name) + '='
    let cookieStart = document.cookie.indexOf(cookieName)
    let cookieValue = ''

    if (cookieStart > -1) {
      var cookieEnd = document.cookie.indexOf(';', cookieStart)
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
    }
    return cookieValue
  },
  // 删除cookie
  delete:  (name) => {
    this.set(name, '', -1)
  }
}

export default CookieUtil
