<template>
  <router-view/>
</template>
<script>
import { toRefs, reactive } from 'vue'
import { getQueryString, toFeishu } from './tools/common'
import{ post } from '@request'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const router = useRouter()
    const state = reactive({
      user: localStorage.getItem('user') || {},
    }) 
     
    const getLogin = async (params)=>{
      try {
        let user =  await post('/login', params,{ larkAppId:`${process.env.VUE_APP_APPID}` })
        console.log('user: ', user)
        localStorage.setItem('user', JSON.stringify(user))
        router.push('/configPage')
        // location.reload()
      } catch (error) {
        toFeishu()
      }
    }
    
    //跳转飞书登陆
    if (JSON.stringify(state.user) === '{}') {
      getQueryString().code ? getLogin({ code:getQueryString().code }) : toFeishu()
    } else {
      state.user = JSON.parse(localStorage.getItem('user'))
    } 

    return{
      getLogin,
      ...toRefs(state),
    }
  }
}
</script>
<style lang="less" src='./style/index.less'/>

