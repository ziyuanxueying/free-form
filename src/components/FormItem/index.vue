<template>
  <span>
    <component
      :is="item"
      v-bind="element.configList"
      :form="settings"
      :proto="proto"
    />
    <icon-delete v-show="pageFrom==='content'" class="del-item" @click="delectItem(element)"/>
  </span>
</template>
<script>
import { getAllComponents ,getComponentsObj } from '../../utils'
import { reactive,ref } from '@vue/reactivity'
import { useFormConfigStore } from '../../store'
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
    console.log('props: ',props.pageFrom, props)
    const components = getAllComponents()
    const item = components[props.element.type] || null
    
    let settings = reactive({})
    const propsVal = reactive(props) 
    const formConfig  = useFormConfigStore()
    let proto = ref('')
   
    if(props.pageFrom === 'setting') {
      settings = propsVal.form
      proto.value = propsVal.element.configList.fileId
    }
    else if(props.pageFrom === 'setform') {
      settings = formConfig.formSet
      proto.value = propsVal.element.configList.fileId
      console.log('fileId: ', propsVal.element.configList.fileId)
    }
    else if(props.pageFrom === 'content') {
      settings = propsVal.element.configList
      proto.value = 'defaultVal'
    }

    const delectItem = (element)=>{
      let res = getComponentsObj(formConfig.formItemList,element.fieldId)
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
<style lang="less" scoped>
.del-item {
  position: absolute;
  right: 10px;
  bottom: 0;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: #0089ff;
  }
}
</style>