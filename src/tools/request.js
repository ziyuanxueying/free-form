import { parse } from 'url'
const SSO_ERR_STATUS = 401
const AUTH_ERR_CODE = 403
import { toFeishu } from '../tools/common'

function convertObjtoUrlSearch (data) {
  let _result = []
  for (let key in data) {
    let value = data[key]
    if (value.constructor === Array) {
      value.forEach(function (_value) {
        _result.push(key + '=' + _value)
      })
    } else {
      _result.push(key + '=' + value)
    }
  }
  return _result.join('&')
}


const responseInterceptor = async (res) => {
  if (res.status === 401) {
    localStorage.removeItem('user')
    return toFeishu()
  }
  if (res.status >= 300) {
    throw new Error(`${res.status} Error happens`)
  }
  if (res.status === 204) {
    return { code: 0, data: 'SUCCESS' }
  }
  if (res.status !== 200) {
    return res
  }
  const result = await res.json()
  if (result.status === SSO_ERR_STATUS) { // 这是 SSO 的拦截处理
    throw new Error('认证失败，请刷新页面！')
  }
  if (result.code === AUTH_ERR_CODE) { // 这是鉴权的拦截处理
    const url = parse(res.url)
    throw new Error(`没有接口 ${url.pathname} 的权限，请联系管理员申请！`)
  }
  if(result.code === 200) {
    return result.data
  }else{
    throw new Error(`接口错误:code ${result.code}`)
  }
}
const baseUrl = process.env.VUE_APP_BASE_URL
const getInstance = (url, params) => fetch(`${url}?${convertObjtoUrlSearch(params)}`).then(responseInterceptor)
const postInstance = (url, body = {},header = {}) =>{ 
  return fetch(`${baseUrl}${url}`,
    Object.assign(
      {},
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
          ...header
        },
        body: JSON.stringify(body)
      }
    )).then(responseInterceptor) 
}
export const get = getInstance
export const post = postInstance