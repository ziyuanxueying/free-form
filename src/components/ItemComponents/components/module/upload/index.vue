<template>
  <a-form-item
    :field="fileId"
    :label="label"
    :required="required"
    :hideLabel="hideLabel"
    :disabled="disabled"
    :label-col-props="{span:4}"
    :wrapper-col-props="{span:20}"
  >
    <a-upload action="/" :limit="maxCount">
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
  icon: 'icon-upload',
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
    disabled:{
      type: Boolean,
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
