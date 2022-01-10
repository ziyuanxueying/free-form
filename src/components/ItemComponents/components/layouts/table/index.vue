<template>
  <div class="nxf-table">
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
                item-key="fieldId"
              >
                <template #item="{element}">
                  <div :class="{'nxf-layout-content-form-item':true,'nxf-layout-content-form-item-active':element.fieldId===formConfig.fieldId}" @click.stop="checkElement(element)">
                    <FormItem :element="element"/>
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
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { useFormConfigStore } from '@/components/configs/store'
import FormItem from '@/components/FormItem'
import draggable from 'vuedraggable'
export default {
  name:'NxTable',
  nameCN:'表格',
  props:{
    layout:{
      type:Object,
    } 
  },
  components: {
    draggable,
    FormItem
  },
  setup (props) {
    const formConfig = useFormConfigStore()
    const checkElement = (element)=>{
      //存放当前选中的组件的fieldId
      formConfig.fieldId = element.fieldId
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
    }
    )
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
.nxf-table{
    padding:5px;
    .nxf-table-td{
        border:1px dashed #ccc;
        padding:5px;
        .nxf-table-td-draggable{
            min-height: 100px;
        }
    }
}
</style>