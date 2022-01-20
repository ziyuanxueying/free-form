<template>
  <a-form-item
    :field="fileId"
    :label="label"
    :required="required"
  >
    <a-date-picker
      :placeholder="placeholder"
      allow-clear
      :format="format"
    />
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
// import { reactive,watch } from 'vue'
export default {
  name: 'NxDatePicker',
  nameCN: '日期选择器',
  props: {
    fileId: {
      type: null,
      default: 'datePicker'
    },
    label: {
      type: String,
      default: '日期选择器'
    },
    placeholder:{
      type: String,
      default: '请选择日期'
    },
    required:{
      type: Boolean,
      default: false
    },
    defaultVal:{
      type: String,
    },
    format:{
      type: String,
      default: 'YYYY-MM-DD'
    },
  },
}
</script>