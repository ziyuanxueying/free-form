<template>
  <a-form-item
    :field="key"
    :label="label"
  >
    <a-textarea
      placeholder="Please enter something"
      allow-clear
    />
  </a-form-item>
</template>
<script>
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
    }
  },
}
</script>