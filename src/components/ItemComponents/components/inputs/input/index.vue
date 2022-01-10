<template>
  <a-form-item
    :field="fileId"
    :label="label"
  >
    <a-input
      :placeholder="placeholder"
      allow-clear
      v-model="form[fileId]"
    />
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
export default {
  name: 'NxInput',
  nameCN: '输入框',
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
      type: String,
      default: 'false'
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