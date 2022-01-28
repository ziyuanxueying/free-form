<template>
  <a-form-item
    :field="fileId"
    :label="label"
    :required="required"
  >
    <a-range-picker/>
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
  },
}
</script>