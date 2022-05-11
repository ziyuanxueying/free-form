<template>
  <div style="flex: 1;">
    <a-select
      multiple
      v-if="item.type=='NxStaff'"
      v-model="formData[id]"
      :placeholder="ifDisabled?'':item.configList.placeholder"
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
      v-if="['NxOABank','NxOACity'].includes(item.type)"
      v-model="formData[id]"
      :placeholder="ifDisabled?'':item.configList.placeholder"
      :allow-search="true"
    >
      <a-option v-for="(citem,index) in list" :key="index" :value="citem.value">
        {{ citem.value }}
      </a-option>
    </a-select>
    <a-input v-if="item.type=='NxOAName'" v-model="formData[id]" disabled/>
    <a-input v-if="item.type=='NxOADepart'" v-model="formData[id]" disabled/>
    <ItemOaLink
      v-if="item.type=='NxOALinkForm'"
      :data="formData[id]"
      @changeData="changeData"
      :ifDisabled="ifDisabled"
    />
  </div>
</template>

<script>
import { reactive, toRefs, defineComponent } from 'vue'
import { post } from '../utils/request'
import { useRoute } from 'vue-router'
import _ from 'lodash'
import ItemOaLink from './itemOaLink.vue'
const urlList = [
  { type:'NxOABank', url:'/oa-platform/bank/selectList' },
  { type:'NxOACity', url:'/oa-platform/region/cityList' }
]
export default defineComponent({
  name:'ItemOa',
  components:{ ItemOaLink },
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
    const state = reactive({ 
      staffLoad:false ,
      list:[], 
      choose:[],
      typeChoose: _.find(urlList, ['type',props.item.type ])
    })
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

    const selectSearch = (value)=>{
      value && (state.choose = [])
      state.staffLoad = true
      post(`${process.env.VUE_APP_BASE_URL}${state.typeChoose.url}`,{ city: value }).then((res)=>{
        state.staffLoad = false
        state.list = res.data
        state.list = [...res.data, ...state.choose]
      })
    }

    if(['NxOABank','NxOACity'].includes(props.item.type)) {
      setTimeout(() => {
        if(!props.formData[props.id]) { selectSearch() } else {
          post(`${process.env.VUE_APP_BASE_URL}${state.typeChoose.url}`,{ city: props.formData[props.id] }).then((res)=>{
            state.choose = res.data
          })
          selectSearch()
        }
      }, 0)
    }
    
    // 选择员工的接口
    const handleSearch = (value)=>{
      value && (state.choose = [])
      state.staffLoad = true
      urlList
      post(`${process.env.VUE_APP_BASE_URL}/user-api/user/search-compound`,{ userIds: value }).then((res)=>{
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
          post(`${process.env.VUE_APP_BASE_URL}/user-api/user/search-compound`,{ userIds : props.formData[props.id] }).then((res)=>{
            if(!res) return
            state.choose = [{ value: res.data[0].enName, key: res.data[0].id }]
          })
          handleSearch()
        }
      }, 0)
    }

    function changeData (val) {
      props.formData[props.id] = val
      console.log('val: ', val)
    }

    route.query.info && changeApply()

    return {
      ...toRefs(state),
      handleSearch,
      changeApply,
      changeData,
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