<template>
  <div class="nxf-layout-content">
    <!-- <a-button @click="test"> -->
    <a-button @click="visible = true">
      查看JSON
    </a-button>
    <a-form :model="form" class="nxf-layout-content-form">
      <draggable
        v-model="formConfig.formItemList"
        group="NXFormGroup"
        class="nxf-layout-content-draggable"
        item-key="fieldId"
      >
        <template #item="{element}">
          <div
            :class="{ 'nxf-layout-content-form-item':true,
                      'nxf-layout-content-form-item-active':element.fieldId===formConfig.fieldId }" 
            @click="checkElement(element)"
          >
            <FormItem :element="element"/>
          </div>
        </template>
      </draggable>
    </a-form>
  </div>
  <a-modal
    :width="600"
    v-model:visible="visible"
    title="查看当前JSON"
  >
    <a-typography>
      <a-typography-paragraph copyable>
        <vue-json-pretty :data="formConfig.toJSON" :showSelectController="true"/>
        <span class="copy"/>
      </a-typography-paragraph>
    </a-typography>
  </a-modal>
</template>
<script>
import { ref } from '@vue/reactivity'
import { useFormConfigStore } from './store'
import draggable from 'vuedraggable'
import FormItem from '../FormItem'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import{ post } from '@request'

export default {
  components: {
    VueJsonPretty,
    draggable,
    FormItem
  },
  data () {
    return {
      visible: false
    }
  },
  setup () {
    const  formConfig  = useFormConfigStore()
    const checkElement = (element)=>{
    //存放当前选中的组件的fieldId
      formConfig.fieldId = element.fieldId
    }
    const test = async ()=>{
    //   await post('/company/list')
      let aaa = await post('/formDef/create',{ projectName:'test1',title:'title1',formDefJson:'formDefJson' })
      console.log('aaa: ', aaa)
    }
    let form = ref({})
    return {
      checkElement,
      test,
      formConfig,
      form
    }
  },
}
</script>
<style lang="less" scoped>
.arco-form-item {
  margin: 10px 0;
}

.copy {
  &::before {
    content: 'JSON 复制';
  }
}
</style>