<template>
  <a-form-item
    :field="fileId"
    :label="label"
    :hideLabel="hideLabel"
    :disabled="disabled"
    :required="required"
  >
    <a-select v-model="form[proto]" :placeholder="placeholder">
      <span v-if="!remote">
        <a-option v-for="item in columns" :key="item.key || item.value" :value="item.key || item.value">
          {{ item.value }}
        </a-option>
      </span>
    </a-select>
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
import { watch } from '@vue/runtime-core'
export default {
  name: 'NxSelect',
  nameCN: '下拉框',
  icon:'icon-down-circle',
  props: {
    fileId: {
      type: null,
      default: 'select'
    },
    label: {
      type: String,
      default: '下拉框'
    },
    placeholder:{
      type: String,
      default: '请选择'
    },
    required:{
      type: Boolean,
      default: false
    },
    disabled:{
      type: Boolean,
    },
    multiple:{
      type: Boolean,
      default: false
    },
    hideLabel:{ type: Boolean, },
    columns:{
      type: Object
    },
    remote:{ type: Boolean },
    form:{
      type:Object,
      default () {
        return null
      }
    },
    proto:{  //绑定的key
      type: String,
    },
    defaultVal:{
      type: String,
    },
    remoteUrl:{ type: String, },
    remotePath:{ type: String, },
    keys:{ type: Object, },
    pageFrom:{ type: String, },
  },
  setup (props) {
    watch(()=>props.columns,()=>{
      let colCount = props.columns.length
      console.log('colCount: ', colCount)
    },{
      deep:true
    })
  }
}
</script>
