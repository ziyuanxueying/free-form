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
      @change="changeFormItem"
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
      @change="changeFormItem"
    >
      <a-option v-for="(citem,index) in list" :key="index" :value="citem.value">
        {{ citem.value }}
      </a-option>
    </a-select>
    <a-input
      v-if="item.type=='NxOAName'"
      v-model="formData[id]"
      @change="changeFormItem"
      disabled
    />
    <a-input
      v-if="item.type=='NxOADepart'"
      @change="changeFormItem"
      v-model="formData[id]"
      disabled
    />
    <ItemOaLink
      v-if="item.type=='NxOALinkForm'"
      :data="formData[id]"
      @changeData="changeData"
      :ifDisabled="ifDisabled"
    />
  </div>
</template>

<script>
import { reactive, toRefs, defineComponent,watch } from 'vue'
import{ post } from '@/tools/request'
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
  emits:['changeFormItem'],
  setup (props,{ emit }) { 
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
      post(`${state.typeChoose.url}`,{ city: value }).then((res)=>{
        state.staffLoad = false
        state.list = res
        state.list = [...res, ...state.choose]
      })
    }

    if(['NxOABank','NxOACity'].includes(props.item.type)) {
      setTimeout(() => {
        if(!props.formData[props.id]) { selectSearch() } else {
          post(`${state.typeChoose.url}`,{ city: props.formData[props.id] }).then((res)=>{
            state.choose = res
          })
          selectSearch()
        }
      }, 0)
    }
    // 选择员工的api
    const searchStaffApi = ({ userIds,searchKey })=>{
      state.staffLoad = true
      post('/user-api/user/search-compound',{ userIds,searchKey,limitFlag:true }).then((res)=>{
        state.staffLoad = false
        state.list = res.map(item=>{
          return { value: item.enName, key: item.id }
        })
      })
    }
    // 选择员工处理函数
    const handleSearch = (value)=>{
      searchStaffApi({ searchKey:value,userIds:props.formData[props.id] })
    }
    const changeFormItem = ()=>{
      //预览下改变表单值，更新一下审批流
      if(route.query.type === 'preview') emit('changeFormItem')
    }
    // 选择员工组件回显名称
    if(props.item.type === 'NxStaff') {
      setTimeout(() => {
        const userIds = props.formData[props.id] || []
        searchStaffApi({ userIds })
      }, 0)
    }

    function changeData (val) {
      props.formData[props.id] = val
    }

    route.query.info && changeApply()

    if(['copy','edit'].includes(route.query.type)) {
      setTimeout(() => {
        relationFunc()
      }, route.query.type === 'edit' ? 0 : 100)
    }
    
    function relationFunc () {
      if(props.item?.relation?.relationTem === 0) {
        const relation =  { ...props.item.relation }
        // 关联其他组件，相等
        if(relation.relationType === '0') {
          watch(()=>props.formData[props.item.relation.relationCompo],(val)=>{
            // 关联本表普通组件
            props.formData[props.id] = val
          })
        }
      }
    }
    if(props.item.type === 'NxStaff') {
      watch(()=>props.formData[props.id],(val)=>{
        if(Array.isArray(val)) {
          searchStaffApi({ userIds:val })
        }else {
          searchStaffApi({ userIds:[val] })
        }
        // 关联本表普通组件
        // props.formData[props.id] = val
      })
    }
    
    return {
      ...toRefs(state),
      handleSearch,
      changeApply,
      changeData,
      searchStaffApi,
      changeFormItem
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