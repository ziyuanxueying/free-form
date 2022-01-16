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
    console.log('input---props: ', props)
    // eslint-disable-next-line vue/no-setup-props-destructure
    // model.value = props.form[props.fileId]
    watch(()=>props.defaultVal,()=>{
      console.log('defaultVal',props.defaultVal)
      model.value = props.defaultVal
    })
    watch(()=>props.form[props.fileId],()=>{
      //获取当前选中组件的唯一id
      model.value = props.form[props.fileId]
      console.log('form',props.form[props.fileId])
    })

    const inputChange = (res)=>{
      props.form[props.fileId] = res
    }
    return {
      model,
      inputChange
    }
  }
}
</script>