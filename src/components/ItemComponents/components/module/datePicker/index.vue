<template>
  <a-form-item
    :field="fileId"
    :label="label"
    :required="required"
    :disabled="disabled"
    :hideLabel="hideLabel"
  >
    <a-date-picker
      v-model="form[proto]"
      :placeholder="placeholder"
      allow-clear
      :format="format"
      :value-format="format"
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
    proto:{ type: String, },
    defaultVal:{
      type: String,
    },
    required:{ type: Boolean, },
    hideLabel:{ type: Boolean, },
    disabled:{ type: Boolean, },
    format:{
      type: String,
      default: 'YYYY-MM-DD'
    },
    form:{
      type:Object,
      default () {
        return null
      }
    },
  },
}
</script>