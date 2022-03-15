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
        <a-option v-for="(item,index) in dataItemList" :key="index" :value="item.colName">
          {{ item.colName }}
        </a-option>
      </a-select>
    </a-form-item>
  </div>
</template>
<script>
import{ post } from '@/tools/request'
import { reactive, toRefs } from 'vue-demi'
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
  setup () {
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
    function changeInforBase (val) {
      if(!val) {
        return 
      }
      post(`/oa-platform/infoMeta/columnList/${val}`).then(res=>{
        state.dataItemList = res || []
      })
    }
    return {
      ...toRefs(state),
      getInforBase,
      changeInforBase
    }
  }
}
</script>