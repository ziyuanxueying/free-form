<template>
  <div style="flex: 1;">
    <a-select
      v-if="item.type=='NxStaff'"
      v-model="formData[id]"
      :placeholder="item.configList.placeholder||'请选择'"
      @search="handleSearch"
      :filter-option="false"
      :allow-search="true"
      :loading="staffLoad"
      :disabled="ifDisabled"
      :show-extra-options="false"
    >
      <a-option v-for="citem in list" :key="citem.key" :value="citem.key">
        {{ citem.value }}
      </a-option>
    </a-select>
    <a-select
      v-if="item.type=='NxOABank'"
      v-model="formData[id]"
      :placeholder="item.configList.placeholder||'请选择'"
      :allow-search="true"
      :virtual-list-props="{height:200}"
      :options="list"
    >
      <!-- <a-option v-for="(citem,index) in list" :key="index" :value="citem.key || citem.value">
        {{ citem.value }}
      </a-option> -->
    </a-select>
    <a-input v-if="item.type=='NxOAName'" v-model="formData[id]" disabled/>
    <a-input v-if="item.type=='NxOADepart'" v-model="formData[id]" disabled/>
  </div>
</template>

<script>
import { reactive, toRefs, defineComponent } from 'vue'
import { post } from '../utils/request'
import { useRoute } from 'vue-router'
// import { Decrypt } from '../../utils/index'
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
    const state = reactive({ staffLoad:false ,list:[], choose:[] })
    function changeApply () {
      let info = JSON.parse(route.query.info) 
      if(props.item.type === 'NxOAName') {
        props.formData[props.id] = info.name === '自己' ? JSON.parse(localStorage.getItem('user')).enName : info.name
        props.formData[`${props.id}Id`] = info.id
      }
      if(props.item.type === 'NxOADepart') {
        props.formData[props.id] =  info.departName
        props.formData[`${props.id}Id`] =  info.departId
      }
    }
    
    const handleSearch = (value)=>{
      value && (state.choose = [])
      state.staffLoad = true
      post(`${process.env.VUE_APP_BASE_URL}/user-api/user/search-compound`,{ searchKey: value }).then((res)=>{
        state.staffLoad = false
        state.list = res.data.map(item=>{
          return { value: item.enName, key: item.id }
        })
        state.list = [...state.list, ...state.choose]
      })
    }

    if(props.item.type === 'NxStaff') {
      setTimeout(() => {
        if(!props.formData[props.id]) { handleSearch() } else {
          post(`${process.env.VUE_APP_BASE_URL}/user-api/user/search-compound`,{ searchKey: props.formData[props.id] }).then((res)=>{
            state.choose = [{ value: res.data[0].enName, key: res.data[0].id }]
          })
          handleSearch()
        }
      }, 0)
    }

    const selectSearch = (value)=>{
      value && (state.choose = [])
      state.staffLoad = true
      post(`${process.env.VUE_APP_BASE_URL}/oa-platform/region/cityList`,{ city: value }).then((res)=>{
        state.staffLoad = false
        state.list = res.data
        state.list = [...res.data, ...state.choose]
      })
    }
    console.log('props.item.type: ', props.item.type)
    if(props.item.type === 'NxOABank') {
      setTimeout(() => {
        if(!props.formData[props.id]) { selectSearch() } else {
          post(`${process.env.VUE_APP_BASE_URL}/oa-platform/region/cityList`,{ city: props.formData[props.id] }).then((res)=>{
            state.choose = res.data
          })
          selectSearch()
        }
      }, 0)
    }

    route.query.info && changeApply()

    return {
      ...toRefs(state),
      handleSearch,
      changeApply,
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