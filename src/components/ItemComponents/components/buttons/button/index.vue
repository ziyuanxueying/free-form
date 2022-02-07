<template>
  <a-form-item
    :field="fileId"
    :label="label"
    :required="required"
    :hideLabel="hideLabel"
  >
    <a-button type="primary">
      <template #icon>
        <icon-upload/>
      </template>
      <template #default>
        {{ text }}
      </template>
    </a-button>
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
// import { reactive,watch } from 'vue'
export default {
  name: 'NxButton',
  nameCN: '按钮',
  icon: 'icon-bold',
  props: {
    fileId: {
      type: null,
      default: 'button'
    },
    label: {
      type: String,
      default: '按钮'
    },
    required:{
      type: Boolean,
      default: false
    },
    hideLabel:{ type: Boolean, },
    text:{
      type: String,
      default: '点击上传'
    },
    maxCount:{
      type: Number,
      default () {
        return 0
      }
    }
  },
}
</script>