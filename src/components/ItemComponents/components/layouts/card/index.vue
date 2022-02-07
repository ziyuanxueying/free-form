<template>
  <div :class="pageFrom==='content'?'nxf-card':''">
    <draggable
      v-model="layout.colContent[0]"
      group="NXFormGroup"
      class="nxf-card-draggable"
      item-key="componentId"
    >
      <template #item="{element}">
        <div :class="{'nxf-layout-content-form-item':true,'nxf-layout-content-form-item-active':element.fieldId===formConfig.fieldId}" @click.stop="checkElement(element)">
          <FormItem :element="element" :pageFrom="pageFrom"/>
        </div>
      </template>
    </draggable>
    <a-button type="outline" v-if="layout.ifAdd" style="width: 100%;">
      添加
    </a-button>
  </div>
</template>
<script>
export { default as setting } from './setting'
import { useFormConfigStore } from '../../../../../store'
import FormItem from '../../../../FormItem'
import draggable from 'vuedraggable'
export default {
  name:'NxCard',
  nameCN:'卡片',
  icon:'icon-folder',
  props:{
    layout:{
      type:Object,
    },
    pageFrom:{
      type:String
    }
  },
  components: {
    draggable,
    FormItem
  },
  setup () {
    const formConfig = useFormConfigStore()
    const checkElement = (element)=>{
      //存放当前选中的组件的componentId
      formConfig.componentId = element.componentId
    }
    return {
      checkElement,
      formConfig
    }
  },
}
</script>
<style lang="less" scoped>
.nxf-card {
  margin-bottom: 14px;
  border: 1px dashed #ccc;
  padding: 4px;

  .nxf-card-draggable {
    min-height: 100px;
  }
}
</style>