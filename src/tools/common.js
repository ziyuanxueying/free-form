// import saveStore from '../config/mUtils.js'

export function getQueryString () {
  const url = decodeURI(location.search) // 获取url中"?"符后的字串(包括问号)
  let query = {}
  if (url.indexOf('?') !== -1) {
    const str = url.substr(1)
    const pairs = str.split('&')
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split('=')
      query[pair[0]] = pair[1]
    }
  }
  return query // 返回对象
}

export function toFeishu () {
  const target = process.env.VUE_APP_MODE
  let buildUrl =
    `https://open.feishu.cn/open-apis/authen/v1/index?redirect_uri=https%3A%2F%2Foa.naxions.com&app_id=${process.env.VUE_APP_APPID}`
  let preUrl =
    'https://open.feishu.cn/open-apis/authen/v1/index?redirect_uri=https%3A%2F%2Fpre-bigdata.naxions.com%2F&app_id=cli_a140c2b81f39500d'
  let testUrl =
    'https://open.feishu.cn/open-apis/authen/v1/index?redirect_uri=https%3A%2F%2Ftest-bigdata.naxions.com&app_id=cli_a1064169f33b100d'
  let devUrl =
    'https://open.feishu.cn/open-apis/authen/v1/index?redirect_uri=https%3A%2F%2Foa-dev.naxions.com%2F&app_id=cli_a12d85499366100e'
  let localUrl = process.env.VUE_APP_FEISHU

  let url
  switch (target) {
  case 'production':
    url = buildUrl
    break
  case 'pre':
    url = preUrl
    break
  case 'test':
    url = testUrl
    break
  case 'development':
    url = devUrl
    break
  default:
    url = localUrl
  }
  console.log('url: ', url)
//   location.href = url
}

export function getDateNDayAgo (n) {
  const date = new Date()
  const time = date.getTime()
  const agoTime = time + 60 * 60 * 24 * (n || 0) * 1000
  const agoDate = new Date(agoTime)
  const y = agoDate.getFullYear()
  const m = agoDate.getMonth() + 1
  const d = agoDate.getDate()
  const mm = m < 10 ? '0' + m : m
  const dd = d < 10 ? '0' + d : d
  return y + '-' + mm + '-' + dd
}