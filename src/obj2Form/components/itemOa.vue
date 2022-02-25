<template>
  <a-select
    v-if="item.type=='NxStaff'"
    v-model="formData[id]"
    :placeholder="item.configList.placeholder||'请选择'"
    @search="handleSearch"
    :filter-option="false"
    allow-clear
    allow-search
    :loading="staffLoad"
  >
    <a-option v-for="(citem,index) in proxyOptions[id]" :key="index" :value="citem.key">
      {{ citem.value }}
    </a-option>
  </a-select>
  <a-input v-if="item.type=='NxOAName'" v-model="formData[id]" disabled/>
  <a-input v-if="item.type=='NxOADepart'" v-model="formData[id]" disabled/>
</template>

<script>
import { reactive, toRefs, } from 'vue'
import { post } from '../utils/request'
import { useRoute } from 'vue-router'
export default {
  props:{
    item:{ type:Object },
    formData:{ type:Object },
    proxyOptions:{ type:Object },
    pathSetObj:{ type:Object },
    ifRequired:{ type:Boolean, default:()=>false },
    ifDisabled:{ type:Boolean, default:()=>false },
    id:{ type:null, }
  },
  setup (props) { 
    const route = useRoute()
    const state = reactive({ staffLoad:false })
    if(!props.ifDisabled) {
      if(props.item.type === 'NxOAName') {
        props.formData[props.id] =  route.query.name === '自己' ? JSON.parse(localStorage.getItem('user')).enName : route.query.name
      }
      if(props.item.type === 'NxOADepart') {
        props.formData[props.id] =  route.query.name === '自己' ? '前端' : route.query.depart
      }
    }
    const handleSearch = (value)=>{
      state.staffLoad = true
      post(`${process.env.VUE_APP_BASE_URL}/user-api/user/search-compound`,{ searchKey: value }).then((res)=>{
        state.staffLoad = false
        props.proxyOptions[props.id] = res.data.map(item=>{
          return { value: item.enName, key: item.id }
        })
      })
    }
    return {
      ...toRefs(state),
      handleSearch,
    }
  },
  mounted () {
  },
  methods:{

  },
}
</script>

<style lang="less" scoped>
</style>