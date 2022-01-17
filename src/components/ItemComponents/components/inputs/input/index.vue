<template>
  <a-form-item
    :field="fileId"
    :label="label"
  >
    <a-input
      :placeholder="placeholder"
      v-model="modelVal[fileId]"
      allow-clear
    />
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
import { reactive,watch } from 'vue'
export default {
  name: 'NxInput',
  nameCN: '输入框',
  props: {
    fileId: {
      type: null,
      default: 'input'
    },
    label: {
      type: String,
      default: '输入框'
    },
    placeholder:{
      type: String,
      default: '请输入内容'
    },
    required:{
      type: String,
      default: 'false'
    },
    defaultVal:{
      type: String,
    },
    form:{
      type:Object,
      default () {
        return null
      }
    }
  },
  setup (props) {
    const modelVal = reactive(props.form)
    watch(()=>props.defaultVal,()=>{
      modelVal[props.fileId] = props.defaultVal
    })

    return {
      modelVal,
    }
  }
}
</script>