<template>
  <div class="nxf-card">
    <draggable
      v-model="layout.colContent[0]"
      group="NXFormGroup"
      class="nxf-card-draggable"
      item-key="fieldId"
    >
      <template #item="{element}">
        <div :class="{'nxf-layout-content-form-item':true,'nxf-layout-content-form-item-active':element.fieldId===formConfig.fieldId}" @click.stop="checkElement(element)">
          <FormItem :element="element"/>
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
import { useFormConfigStore } from '@store'
import FormItem from '@/components/FormItem'
import draggable from 'vuedraggable'
export default {
  name:'NxCard',
  nameCN:'卡片',
  props:{
    layout:{
      type:Object,
    } 
  },
  components: {
    draggable,
    FormItem
  },
  setup () {
    const formConfig = useFormConfigStore()
    const checkElement = (element)=>{
      //存放当前选中的组件的fieldId
      formConfig.fieldId = element.fieldId
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
  border: 1px dashed #ccc;
  padding: 5px;

  .nxf-card-draggable {
    min-height: 100px;
  }
}
</style>