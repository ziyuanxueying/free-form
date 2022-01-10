<template>
  <a-form-item
    :field="key"
    :label="label"
  >
    {{ maxLength }}
    <a-textarea
      placeholder="Please enter something"
      allow-clear
      :max-length="maxLength"
    />
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
export default {
  name: 'NxTextarea',
  nameCN: '文本域',
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
    }
  },
}
</script>