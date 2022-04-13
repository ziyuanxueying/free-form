<template>
  <!-- <div :class="pageFrom==='setting'&&proto!=='columns'?'line':''"> -->
  <div>
    <component
      :is="item"
      v-bind="{...element.configList,pageFrom}"
      :form="settings"
      :proto="proto"
    />
    <!-- <icon-copy v-show="pageFrom==='content'" class="item-btn copy" @click="EditItem(element,1)"/> -->
    <icon-delete v-show="pageFrom==='content'" class="item-btn del" @click="EditItem(element,0)"/>
  </div>
</template>
<script>
import { getAllComponents ,getComponentsObj } from '../../utils'
import { reactive,ref } from 'vue'
import { useFormConfigStore } from '../../store'
import _ from 'lodash'
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
      formConfig,
      proto,
      EditItem
    }
  },
  watch:{
    'formConfig.formSet' (val) {
      this.settings = val
      this.$forceUpdate()
    }
  }
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
// 右侧设置的form样式
.line {
  //   margin-top: 10px;
  //   border-bottom: 1px solid #f0f0f0;

  .arco-row {
    // margin-bottom: 10px;
  }

  &:last-child {
    border: none;
  }
}
</style>
