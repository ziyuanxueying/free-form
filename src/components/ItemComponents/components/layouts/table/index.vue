<template>
  <div :class="pageFrom==='content'?'nxf-table':''">
    <a-table
      :data="formData"
      :bordered="{wrapper: true, cell: true}"
      :pagination="false"
    >
      <template #columns>
        <a-table-column
          v-for="(item,index) in layout.columns"
          :key="index"
          :title="item.value"
          :data-index="item.key"
        >
          <template #cell>
            <div class="nxf-table-td">
              <draggable
                v-model="layout.colContent[index]"
                group="NXFormGroup"
                class="nxf-table-td-draggable"
                item-key="componentId"
              >
                <template #item="{element}">
                  <div :class="{'nxf-layout-content-form-item':true,'nxf-layout-content-form-item-active':element.fieldId===formConfig.fieldId}" @click.stop="checkElement(element)">
                    <FormItem :element="element" :pageFrom="pageFrom"/>
                  </div>
                </template>
              </draggable>
            </div>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>
<script>
export { default as setting } from './setting'
import { ref ,watch } from 'vue'
import { useFormConfigStore } from '../../../../../store'
import FormItem from '../../../../FormItem'
import draggable from 'vuedraggable'
export default {
  name:'NxTable',
  nameCN:'表格',
  icon:'icon-interaction',
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
    watch(()=>props.layout.columns,()=>{
      let colCount = props.layout.columns.length
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
    })
    let formData = ref([{}])
    return {
      checkElement,
      formConfig,
      formData
    }
  },
}
</script>
<style lang="less" scoped>
.nxf-table {
  margin-bottom: 14px;
  padding: 4px;

  .nxf-table-td {
    border: 1px dashed #ccc;
    padding: 5px;

    .nxf-table-td-draggable {
      min-height: 100px;
    }
  }
}
</style>