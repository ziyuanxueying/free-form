<template>
  <div class="nxf-layout-content">
    <div class="flex-row">
      <span>
        表单标题：
      </span>
      <a-input
        :style="{width:'200px'}"
        placeholder="请输入表单标题"
        v-model="formTitle"
        allow-clear
      />
      <a-button @click="visible = true">
        查看JSON
      </a-button>
      <a-button @click="saveAsDeaft">
        存为草稿
      </a-button>
    </div>

    <a-form :model="form" class="nxf-layout-content-form">
      <draggable
        v-model="formConfig.formItemList"
        group="NXFormGroup"
        class="nxf-layout-content-draggable"
        item-key="fieldId"
      >
        <template #item="{element}">
          <span>
            <div
              :class="{ 'nxf-layout-content-form-item':true,
                        'nxf-layout-content-form-item-active':element.fieldId===formConfig.fieldId }" 
              @click="checkElement(element)"
            >
              <FormItem :element="element" pageFrom="content"/>
            </div>
          </span>
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
import { reactive, ref, toRefs } from '@vue/reactivity'
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
    const formConfig  = useFormConfigStore()
    const state = reactive({
      formTitle:undefined
    })
    const checkElement = (element)=>{
    //存放当前选中的组件的fieldId
      formConfig.fieldId = element.fieldId
    }
    let form = ref({})
    const initJson = async ()=>{
    //   formConfig.initJson('91a82210-1379-4e03-9f3c-81f71a0bd07b')
      let res = await post('/formDef/get/91a82210-1379-4e03-9f3c-81f71a0bd07b')
      formConfig.initJson(res.formDefJson)
    //   console.log('aaa: ', aaa.formDefJson)
    //   formConfig = JSON.parse(aaa.formDefJson)
    }
    initJson()
    const saveAsDeaft = async ()=>{
      let aaa = await post('/formDef/create',{ projectName:'oa',title: state.formTitle,formDefJson: JSON.stringify(formConfig.toJSON)  })
      console.log('aaa: ', aaa)
    }
    return {
      checkElement,
      initJson,
      saveAsDeaft,
      formConfig,
      form,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="less" scoped>
.arco-btn {
  margin-left: 10px;
}

.arco-form-item {
  margin: 10px 0;
}

.copy {
  &::before {
    content: 'JSON 复制';
  }
}
</style>