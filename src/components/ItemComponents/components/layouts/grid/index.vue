<template>
  <a-row :class="pageFrom==='content'?'nxf-grid-row':''">
    <a-col
      :span="Array.isArray(layout.colCount)? Number(layout.colCount[index].key) : Math.floor(24 / layout.colCount)"
      :offset="Array.isArray(layout.colCount)? Number(layout.colCount[index].value) :0"
      v-for="(item,index ) in layout.colContent"
      :key="index"
    >
      <div class="nxf-grid-col">
        <draggable
          v-model="layout.colContent[index]"
          group="NXFormGroup"
          class="nxf-grid-col-draggable"
          item-key="componentId"
        >
          <template #item="{element}">
            <div :class="{'nxf-layout-content-form-item':true,'nxf-layout-content-form-item-active':element.componentId===formConfig.componentId}" @click.stop="checkElement(element)">
              <FormItem :element="element" :pageFrom="pageFrom"/>
            </div>
          </template>
        </draggable>
      </div>
    </a-col>
  </a-row>
</template> 
<script>
export { default as setting } from './setting'
import { watch } from 'vue'
import { useFormConfigStore } from '../../../../../store'
import FormItem from '../../../../FormItem'
import draggable from 'vuedraggable'
export default {
  name:'NxGrid',
  nameCN: '栅格',
  icon:'icon-layout',
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
  setup (props) {
    const formConfig = useFormConfigStore()
    const checkElement = (element)=>{
      //存放当前选中的组件的componentId
      formConfig.componentId = element.componentId
    }
    watch(()=>props.layout.colCount,()=>{
      let colCount = props.layout.colCount.length
      if(colCount > props.layout.colContent.length) {
        for(let i = 0; i < colCount; i++) {
          if(!props.layout.colContent[i]) {
            props.layout.colContent[i] = []
          }
        }
      }
      else{
        props.layout.colContent.length = colCount
      }
    },{
      deep:true
    }
    )
    return {
      checkElement,
      formConfig
    }
  }
}
</script>
<style lang="less" scoped>
.nxf-grid-row {
  margin-bottom: 14px;
  min-height: 100px;

  .nxf-grid-col {
    border: 1px dashed #ccc;
    box-sizing: border-box;

    .nxf-grid-col-draggable {
      width: 100%;
      min-height: 100px;

      :deep(.arco-col-12) {
        flex: 0 0 75%;
        width: 75%;
      }
    }
  }
}
</style>
