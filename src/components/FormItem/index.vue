<template>
  <span>
    <component
      :is="item"
      v-bind="element.configList"
      :form="settings"
      :proto="proto"
    />
    <span @click="delectItem(element)" v-if="pageFrom==='content'">
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
    console.log('props: ', props)
    const components = getAllComponents()
    const item = components[props.element.type] || null
    console.log('item: ',props.pageFrom, item)
    
    let settings = reactive({})
    const propsVal = reactive(props) 
    const formConfig  = useFormConfigStore()
    let proto = ref('')
   
    if(props.pageFrom === 'setting') {
      settings = propsVal.form
      proto.value = propsVal.element.configList.fileId
    }
    else if(props.pageFrom === 'content') {
      settings = propsVal.element.configList
      proto.value = 'defaultVal'
    }

    const delectItem = (element)=>{
      console.log(element,11111111111111111111)
      const fieldId = element.fieldId
      const formItemList = formConfig.formItemList
      let res = getComponentsObj(formItemList,fieldId)
      console.log('res: ', res)
      if(res) {
        res.parentArr.splice(res.index,1)
      }
    }
    return {
      item,
      settings,
      proto,
      delectItem
    }
  },
}
</script>