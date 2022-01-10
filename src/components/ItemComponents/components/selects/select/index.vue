<template>
  <a-form-item
    :field="fileId"
    :label="label"
  >
    <a-select v-model="form[fileId]" :placeholder="placeholder">
      <a-option>
        Beijing
      </a-option>
      <a-option>
        Shanghai
      </a-option>
      <a-option>
        Guangzhou
      </a-option>
      <a-option disabled>
        Disabled
      </a-option>
    </a-select>
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
export default {
  name: 'NxSelect',
  nameCN: '下拉框',
  props: {
    fileId: {
      type: null,
      default: 'select'
    },
    label: {
      type: String,
      default: '下拉框'
    },
    placeholder:{
      type: String,
      default: '请选择'
    },
    required:{
      type: String,
      default: 'false'
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