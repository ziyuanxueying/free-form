<template>
  <div class="nxf-layout-content">
    <a-form :model="form" class="nxf-layout-content-form">
      <draggable
        v-model="formConfig.formItemList"
        group="NXFormGroup"
        class="nxf-layout-content-draggable"
        item-key="fieldId"
      >
        <template #item="{element}">
          <div :class="{'nxf-layout-content-form-item':true,'nxf-layout-content-form-item-active':element.fieldId===formConfig.fieldId}" @click="checkElement(element)">
            <FormItem :element="element"/>
          </div>
        </template>
      </draggable>
    </a-form>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import { useFormConfigStore } from './store'
import draggable from 'vuedraggable'
import FormItem from '../FormItem'
export default {
  components: {
    draggable,
    FormItem
  },
  setup () {
    const formConfig = useFormConfigStore()
    const checkElement = (element)=>{
      formConfig.fieldId = element.fieldId
    }
    let form = ref({})
    return {
      checkElement,
      formConfig,
      form
    }
  },
}
</script>
<style lang="less" scoped>
    .arco-form-item{
        margin:10px 0px;
    }
</style>