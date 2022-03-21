<template>
  <a-form-item
    :field="fileId"
    :label="label"
    :required="required"
    :disabled="disabled"
    :label-col-props="{span:4}"
    :wrapper-col-props="{span:20}"
  >
    <a-switch v-model="form[proto]"/>
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
export default {
  name: 'NxSwitch',
  nameCN: '开关',
  icon:'icon-poweroff',
  props: {
    fileId: {
      type: null,
    },
    label: {
      type: String,
    },
    required:{
      type: Boolean,
    },
    defaultVal:{
      type: Boolean,
    },
    proto:{  //绑定的key
      type: String,
    },
    disabled:{
      type: Boolean,
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
