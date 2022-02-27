<template>
  <div style="flex: 1;">
    <a-select
      v-if="item.type=='NxStaff'"
      v-model="formData[id]"
      :placeholder="item.configList.placeholder||'请选择'"
      @search="handleSearch"
      :filter-option="false"
      allow-clear
      allow-search
      :loading="staffLoad"
      :disabled="ifDisabled"
    >
      <a-option v-for="(citem,index) in proxyOptions[id]" :key="index" :value="citem.key">
        {{ citem.value }}
      </a-option>
    </a-select>
    <a-input v-if="item.type=='NxOAName'" v-model="formData[id]" disabled/>
    <a-input v-if="item.type=='NxOADepart'" v-model="formData[id]" disabled/>
  </div>
</template>

<script>
import { reactive, toRefs, defineComponent } from 'vue'
import { post } from '../utils/request'
import { useRoute } from 'vue-router'
export default defineComponent({
  name:'ItemOa',
  props:{
    item:{ type:Object,default :()=>{}  },
    formData:{ type:Object,default :()=>{}  },
    proxyOptions:{ type:Object,default :()=>{} },
    pathSetObj:{ type:Object ,default :()=>{} },
    ifRequired:{ type:Boolean, default:()=>false },
    ifDisabled:{ type:Boolean, default:()=>false },
    id:{ type: null, }
  },
  setup (props) { 
    const route = useRoute()
    const state = reactive({ staffLoad:false ,list:[] })
    if(route.query.info) {
      let info = JSON.parse(route.query.info) 
      if(props.item.type === 'NxOAName') {
        props.formData[props.id] =  info.name === '自己' ? JSON.parse(localStorage.getItem('user')).enName : info.name
        props.formData[`${props.id}Id`] =  info.id
      }
      if(props.item.type === 'NxOADepart') {
        props.formData[props.id] =  info.departName
        props.formData[`${props.id}Id`] =  info.departId
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
})
</script>

<style lang="less" scoped>
</style>