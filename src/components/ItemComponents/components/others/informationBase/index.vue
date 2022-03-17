<template>
  <a-form-item
    :field="fileId"
    :label="label"
    :required="required"
    :hideLabel="hideLabel"
    :disabled="disabled"
  >
    <a-space direction="vertical" size="large">
      信息库
    </a-space>
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
export default {
  name: 'NxOAInfo',
  nameCN: '信息库',
  icon:'icon-user-group',
  props: {
    fileId: { type: null, },
    label: { type: String, },
    // defaultVal:{ type: String, },
    required:{ type: Boolean, },
    hideLabel:{ type: Boolean, },
    disabled:{ type: Boolean, },
    oaChooseInfobase:{ type: Number },
    oaChooseDataitem:{ type:Array }
  }
}
</script>