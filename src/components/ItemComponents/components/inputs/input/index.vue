<template>
  <a-form-item
    :field="proto"
    :label="label"
    :required="required"
    :disabled="disabled"
    :validate-trigger="['change','input']"
  >
    <a-input
      :placeholder="placeholder"
      v-model="form[proto]"
      allow-clear
    />
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
// import { reactive,watch } from 'vue'
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
      type: Boolean,
      default: false
    },
    defaultVal:{
      type: String,
    },
    form:{
      type:Object,
      default () {
        return null
      }
    },
    disabled:{
      type: Boolean,
    },
    proto:{  //绑定的key
      type: String,
    }
  }
}
</script>