<template>
  <router-view/>
</template>
<script>
import { toRefs, reactive } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const router = useRouter()
    const state = reactive({
      user: localStorage.getItem('user') || {},
    }) 
     
    const getLogin = ()=>{
      router.push('/configPage')
    }
    getLogin()
    return{
      getLogin,
      ...toRefs(state),
    }
  }
}
</script>
<style lang="less" src='./style/index.less'/>

