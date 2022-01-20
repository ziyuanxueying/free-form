<template>
  <a-form-item
    :field="fileId"
    :label="label"
  >
    <a-switch v-model="form[proto]"/>
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
export default {
  name: 'NxSwitch',
  nameCN: '开关',
  props: {
    fileId: {
      type: null,
    },
    label: {
      type: String,
    },
    required:{
      type: String,
      default: 'false'
    },
    defaultVal:{
      type: Boolean,
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