<template>
  <component
    :is="item"
    v-bind="element.configList"
    :form="componentSetting"
    :proto="proto"
  />
</template>
<script>
import { getAllComponents } from '@utils'
import { reactive,ref } from '@vue/reactivity'
// import { watch } from '@vue/runtime-core'
export default {
  props:{
    element:{
      type:Object,
      default () {
        return{}
      }
    },
    form:{
      type:Object,
      default () {
        return {}
      }
    },
    pageFrom:{
      type:String,
      default:'content'
    }
  },
  setup (props) {
    let componentSetting = reactive({})
    const reactiveProps = reactive(props) 
    let proto = ref('')
    if(props.pageFrom === 'setting') {
      componentSetting = reactiveProps.form
      proto.value = reactiveProps.element.configList.fileId
    }
    else if(props.pageFrom === 'content') {
      componentSetting = reactiveProps.element.configList
      proto.value = 'defaultVal'
    }
    let components = getAllComponents()
    let item = components[props.element.type] || null
    return {
      item,
      componentSetting,
      proto
    }
  },
}
</script>