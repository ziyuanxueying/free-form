<template>
  <a-form-item
    :field="fileId"
    :label="label"
  >
    <a-input
      :placeholder="placeholder"
      allow-clear
      v-model="model"
      @input="inputChange"
      @clear="inputClear"
    />
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
import { ref,watch } from 'vue'
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
    const model = ref(props.form[props.fileId])
    watch(()=>props.defaultVal,()=>{
      model.value = props.defaultVal
    })

    const inputChange = (res)=>{
      props.form[props.fileId] = res
    }
    const inputClear = ()=>{
      props.form[props.fileId] = ''
    }
    return {
      model,
      inputChange,
      inputClear,
    }
  }
}
</script>