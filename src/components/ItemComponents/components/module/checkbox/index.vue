<template>
  <a-form-item
    :field="fileId"
    :label="label"
    :required="required"
    :hideLabel="hideLabel"
    :disabled="disabled"
  >
    <a-space direction="vertical" size="large">
      <a-checkbox-group v-model="form[proto]" :disabled="disabled">
        <template v-if="!remote">
          <a-checkbox v-for="(item,index) in columns" :key="index" :value="item.key">
            {{ item.value }}
          </a-checkbox>
        </template>
        <div v-else>
          远程数据
        </div>
      </a-checkbox-group>
    </a-space>
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
export default {
  name: 'NxCheckbox',
  nameCN: '复选框组',
  icon:'icon-calendar',
  props: {
    fileId: { type: null, },
    label: { type: String, },
    // defaultVal:{ type: Array, },
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
  }
}
</script>