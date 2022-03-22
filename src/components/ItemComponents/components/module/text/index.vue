<template>
  <a-form-item
    :field="fileId"
    :label="label"
    :hideLabel="true"
  >
    <a-typography-paragraph ellipsis :style="`width:100%; text-align:${position};`">
      {{ defaultVal }}
    </a-typography-paragraph>
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
export default {
  name: 'NxText',
  nameCN: '文本',
  icon:'icon-message',
  props: {
    fileId: { type: null },
    label: { type: String, },
    defaultVal:{
      type: String,
      default: '文本内容'
    },
    required:{
      type: String,
      default: 'false'
    },
    position:{
      type: String,
      default: 'left'
    },
    hideLabel:{ type: Boolean, },
    form:{
      type:Object,
      default () {
        return null
      }
    }
  },
}
</script>
