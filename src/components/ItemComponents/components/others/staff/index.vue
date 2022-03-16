<template>
  <a-form-item
    :field="fileId"
    :label="label"
    :required="required"
    :hideLabel="hideLabel"
    :disabled="disabled"
  >
    <a-space direction="vertical" size="large">
      OA自定义选择员工组件
    </a-space>
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
export default {
  name: 'NxStaff',
  nameCN: '选择员工',
  icon:'icon-user-group',
  props: {
    fileId: { type: null, },
    label: { type: String, },
    // defaultVal:{ type: String, },
    required:{ type: Boolean, },
    hideLabel:{ type: Boolean, },
    disabled:{ type: Boolean, },
    columns:{ type: Object },
    remote:{ type: Boolean },
    proto:{ type: String, },
    form:{
      type:Object,
      default () {
        return null
      }
    },
  },
}
</script>