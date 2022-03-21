<template>
  <div style="margin-top: 10px;">
    <a-form-item
      field="oaChooseInfobase"
      label="选择信息库"
    >
      <a-select
        placeholder="请选择信息库"
        @change="changeInforBase"
        allow-search
        @input-value-change="getInforBase"
        v-model="form.oaChooseInfobase"
      >
        <a-option v-for="(item,index) in inforBaseList" :key="index" :value="item.id">
          {{ item.name }}
        </a-option>
      </a-select>
    </a-form-item>
    <a-form-item
      field="oaChooseDataitem"
      label="选择数据项"
    >
      <a-select
        placeholder="请选择数据项"
        allow-search
        v-model="form.oaChooseDataitem"
        multiple
      >
        <a-option
          v-for="item in dataItemList"
          :key="item.colName"
          :value="item"
          :label="item.colName"
        />
      </a-select>
    </a-form-item>
  </div>
</template>
<script>
import{ post } from '@/tools/request'
import { reactive, toRefs } from 'vue-demi'
import _ from 'lodash'
export default {
  name: 'NxBS',
  props:{
    form:{
      type:Object,
      default () {
        return null
      }
    },
  },
  setup (props) {
    const state = reactive({
      inforBaseList:[],
      dataItemList:[],
    })
    getInforBase()
    function getInforBase (name) {
      post('/oa-platform/infoMeta/selectList',{ name }).then(res=>{
        state.inforBaseList = res || []
      })
    }
    function changeInforBase (val,init) {
      if(!init) {
        props.form.oaChooseDataitem = []
        state.dataItemList = []
      }
      post(`/oa-platform/infoMeta/columnList/${val}`).then(res=>{
        state.dataItemList = _.map(res,(item)=>{ return { ...item ,value:item.colName } })
      })
    }

    props.form.oaChooseInfobase && changeInforBase(props.form.oaChooseInfobase, true) 

    return {
      ...toRefs(state),
      getInforBase,
      changeInforBase
    }
  }
}
</script>