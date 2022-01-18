<template>
  <span>
    <component
      :is="item"
      v-bind="element.configList"
      :form="componentSetting"
      :proto="proto"
    />
    <span @click="delectElement(element)" v-if="pageFrom==='content'">
      删除
    </span>
  </span>
</template>
<script>
import { getAllComponents } from '@utils'
import { reactive,ref } from '@vue/reactivity'
import { getComponentsObj } from '@utils'
import { useFormConfigStore } from '../configs/store'
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
    const formConfig  = useFormConfigStore()
    let proto = ref('')
    const delectElement = (element)=>{
      console.log(element,11111111111111111111)
      const fieldId = element.fieldId
      const formItemList = formConfig.formItemList
      let res = getComponentsObj(formItemList,fieldId)
      if(res) {
        res.parentArr.splice(res.index,1)
      }
    }
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
      proto,
      delectElement
    }
  },
}
</script>