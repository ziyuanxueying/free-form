import { parse } from 'url'
import { thrift } from '@thrift-api/request'
import thriftVersion from './thriftVersion'
import injects from './injects/index'
import { mapTheVerison } from '@utils'
const SSO_ERR_STATUS = 401
const AUTH_ERR_CODE = 403

const thriftlessInstance = thrift.create({
  baseURL: '/api/thriftless',
  versionMap: thriftVersion
})

thriftlessInstance.interceptors.request.use(config => {
  const paths = config.url.split('/').filter(Boolean)
  const injectKey = paths.slice(-2).join('/')
  const injectVal = injects[injectKey]
  if (injectVal) {
    config.body = Object.assign(
      {}, 
      config.body, 
      { $inject: injectVal }
    )
  }
  return config
})

const responseInterceptor = async(res) => {
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
  return result
}

thriftlessInstance.interceptors.response.use(responseInterceptor)

const getInstance = (...args) => fetch(...args).then(responseInterceptor)

const postInstance = (url, body = {}) =>
  fetch(url,
    Object.assign(
      {},
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    )).then(responseInterceptor)

export const thriftless = thriftlessInstance

export const get = getInstance

export const post = postInstance

export const workFlow = (url, body) => {
  const requestBody = mapTheVerison(body, thriftVersion)
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  }).then(responseInterceptor)
}