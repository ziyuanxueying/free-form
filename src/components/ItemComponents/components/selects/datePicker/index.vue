<template>
  <a-form-item
    :field="fileId"
    :label="label"
    :required="required"
    :disabled="disabled"
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
  icon:'icon-calendar',
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
    disabled:{
      type: Boolean,
    },
    format:{
      type: String,
      default: 'YYYY-MM-DD'
    },
  },
}
</script>