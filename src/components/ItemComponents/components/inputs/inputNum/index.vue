<template>
  <a-form-item
    :field="fileId"
    :label="label"
    :required="required"
    :disabled="disabled"
  >
    <a-input-number
      :placeholder="placeholder"
      v-model="form[proto]"
      allow-clear
      :min="min" 
      :max="max"
    />
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
export default {
  name: 'NxInputNum',
  nameCN: '数字输入框',
  icon:'icon-original-size',
  props: {
    fileId: {
      type: null,
      default: 'input'
    },
    label: {
      type: String,
      default: '输入框'
    },
    placeholder:{
      type: String,
      default: '请输入内容'
    },
    required:{
      type: Boolean,
    },
    defaultVal:{
      type: Number,
    },
    disabled:{
      type: Boolean,
    },
    min:{
      type: Number, 
    },
    max:{
      type: Number, 
    },
    proto:{  //绑定的key
      type: String,
    },
    form:{
      type:Object,
      default () {
        return null
      }
    }
  },
}
</script>