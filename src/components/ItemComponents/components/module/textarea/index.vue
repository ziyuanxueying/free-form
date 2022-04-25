<template>
  <a-form-item
    :field="proto"
    :label="label"
    :required="required"
    :disabled="disabled"
  >
    <a-textarea
      :placeholder="placeholder"
      allow-clear
      :max-length="maxLength"
      v-model="form[proto]"
    />
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
export default {
  name: 'NxTextarea',
  nameCN: '多行输入框',
  icon:'icon-list',
  props: {
    key: {
      type: null,
      default: 'textarea'
    },
    label: {
      type: String,
      default: '文本域'
    },
    maxLength: {
      type: Number,
      default: 0
    },
    required:{
      type: Boolean,
      default: false
    },
    hideLabel:{ type: Boolean, },
    placeholder:{
      type: String,
      default: '请输入内容'
    },
    disabled:{
      type: Boolean,
    },
    defaultVal:{
      type: String,
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
