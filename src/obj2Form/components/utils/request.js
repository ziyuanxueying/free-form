import axios from 'axios'
axios.defaults.withCredentials = true
const service = axios.create({
  method: 'POST',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 300000, // request timeout
  errorToast: true,
})
export function post (url, data = {}, config = {}) {
  return service.post(url, data, config).then(response => response.data)
}