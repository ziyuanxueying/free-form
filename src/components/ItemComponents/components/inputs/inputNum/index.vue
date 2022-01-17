<template>
  <a-form-item
    :field="fileId"
    :label="label"
    :required="required"
    :disabled="disabled"
  >
    <a-input-number
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
  name: 'NxInputNum',
  nameCN: '数字输入框',
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
      type: Boolean,
    },
    defaultVal:{
      type: Number,
    },
    disabled:{
      type: Boolean,
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
      console.log('props.defaultVal: ', props.defaultVal)
      modelVal[props.fileId] = props.defaultVal
    })
    return {
      modelVal,
    }
  }
}
</script>