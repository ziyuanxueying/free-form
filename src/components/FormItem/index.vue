<template>
  <span>
    <component
      :is="item"
      v-bind="element.configList"
      :form="settings"
      :proto="proto"
    />
    <icon-copy v-show="pageFrom==='content'" class="item-btn copy" @click="EditItem(element,1)"/>
    <icon-delete v-show="pageFrom==='content'" class="item-btn del" @click="EditItem(element,0)"/>
  </span>
</template>
<script>
import { getAllComponents ,getComponentsObj } from '../../utils'
import { reactive,ref } from '@vue/reactivity'
import { useFormConfigStore } from '../../store'
import _ from 'lodash'
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
    }
    else if(props.pageFrom === 'content') {
      settings = propsVal.element.configList
      proto.value = 'defaultVal'
    }
    const EditItem = (element,type)=>{
      let res = getComponentsObj(formConfig.formItemList,element.componentId)
      if(res) {
        let obj = _.cloneDeep(res.obj)
        obj.componentId = `${obj.name}_${new Date().getTime()}`
        type ? res.parentArr.splice(res.index,0,obj) : res.parentArr.splice(res.index,1)
      }
    }
    return {
      item,
      settings,
      proto,
      EditItem
    }
  },
}
</script>
<style lang="less" scoped>
.item-btn {
  position: absolute;
  bottom: 0;
  font-size: 20px;
  cursor: pointer;
  color: #666;

  &.copy {
    right: 40px;
  }

  &.del {
    right: 10px;
  }

  &:hover {
    color: #0089ff;
  }
}
</style>