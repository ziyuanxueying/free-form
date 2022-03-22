<template>
  <a-form-item
    :field="fileId"
    :label="label"
    :required="required"
    :hideLabel="hideLabel"
    :label-col-props="{span:4}"
    :wrapper-col-props="{span:20}"
  >
    <a-range-picker
      :showTime="showTime"
      :format="format"
      readonly
      v-model="form[proto]"
      :disabled="pageFrom === 'content'"
    />
  </a-form-item>
</template>
<script>
export { default as setting } from './setting.js'
// import { reactive,watch } from 'vue'
export default {
  name: 'NxRangePicker',
  nameCN: '日期范围',
  icon:'icon-dashboard',
  props: {
    fileId: {
      type: null,
      default: 'rangePicker'
    },
    label: {
      type: String,
      default: '日期范围选择器'
    },
    required:{
      type: Boolean,
      default: false
    },
    format:{
      type: String,
      default: 'YYYY-MM-DD'
    },
    defaultVal:{
      type: Array,
    },
    hideLabel:{ type: Boolean, },
    showTime:{
      type: Boolean,
      default: false
    },
    proto:{ type: String, },
    pageFrom:{ type: String, },
    form:{
      type:Object,
      default () {
        return null
      }
    },
  },
}
</script>
