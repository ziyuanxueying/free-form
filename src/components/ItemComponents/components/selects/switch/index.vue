<template>
  <a-form-item
    :field="fileId"
    :label="label"
  >
    <a-switch v-model="model" @change="defaultChange"/>
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
import { ref,reactive,toRefs,watch } from '@vue/runtime-core'
export default {
  name: 'NxSwitch',
  nameCN: '开关',
  props: {
    fileId: {
      type: null,
    },
    label: {
      type: String,
    },
    required:{
      type: String,
      default: 'false'
    },
    defaultVal:{
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
    const model = ref(props.form[props.fileId])
    const state = reactive({
      model2: props.form
    })

    watch(()=>props.defaultVal,()=>{
      model.value = props.defaultVal
    })
    const defaultChange = (val)=>{
      props.form[props.fileId] = val
    }
    // watch(()=>props.columns,()=>{
    //   console.log(props)
    //   let colCount = props.columns.length
    //   console.log('colCount: ', colCount)
    // },{
    //   deep:true
    // })
    return {
      ...toRefs(state),
      model,
      defaultChange,
    }
  }
}
</script>