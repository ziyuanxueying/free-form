<template>
  <a-form-item
    :field="fileId"
    :label="label"
    :required="required"
  >
    <a-upload action="/">
      <template #upload-button>
        <a-button type="primary">
          <template #icon>
            <icon-upload/>
          </template>
          <template #default>
            {{ text }}
          </template>
        </a-button>
      </template>
    </a-upload>
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
// import { reactive,watch } from 'vue'
export default {
  name: 'NxUpload',
  nameCN: '上传',
  props: {
    fileId: {
      type: null,
      default: 'upload'
    },
    label: {
      type: String,
      default: '上传'
    },
    required:{
      type: Boolean,
      default: false
    },
    text:{
      type: String,
      default: '点击上传'
    }
  },
}
</script>