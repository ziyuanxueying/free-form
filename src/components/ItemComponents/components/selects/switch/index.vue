<template>
  <a-form-item
    :field="fileId"
    :label="label"
  >
    <a-switch v-model="form[fileId]" checked-color="#F53F3F" unchecked-color="#14C9C9"/>
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
import { watch } from '@vue/runtime-core'
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
    form:{
      type:Object,
      default () {
        return null
      }
    }
  },
  setup (props) {
    console.log('props: ', props)
    watch(()=>props.columns,()=>{
      console.log(props)
      let colCount = props.columns.length
      console.log('colCount: ', colCount)
    },{
      deep:true
    })
  }
}
</script>