import{ get } from '@request'

export default {
  increment () {
    this.count++
  },

  
  getData (params) {

    return get('/api/getHello', params)
  }
}