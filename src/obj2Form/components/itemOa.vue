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
</template>

<script>
import { reactive, toRefs, } from 'vue'
import { post } from '../utils/request'
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
    const state = reactive({ staffLoad:false })
    const handleSearch = (value)=>{
      console.log('value: ', value)
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