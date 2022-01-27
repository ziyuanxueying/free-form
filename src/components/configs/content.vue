<template>
  <div class="nxf-layout-content">
    <div class="flex-row">
      <a-button @click="visible = true">
        查看JSON
      </a-button>
      <a-button @click="FormModal = true">
        预览
      </a-button>
      <a-button @click="saveAsDraft">
        存为草稿
      </a-button> 
      <a-button @click="visible = true">
        表单发布
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
  <a-modal
    :width="700"
    v-model:visible="FormModal"
    title="表单预览"
  >
    <FormShow/>
  </a-modal>
</template>
<script>
import { reactive, ref, toRefs } from 'vue'
import { useFormConfigStore } from '../../store'
import draggable from 'vuedraggable'
import FormItem from '../FormItem'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import{ post } from '../../tools/request'
import { useRoute } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import  FormShow from '../../pages/formShow'

export default {
  components: {
    VueJsonPretty,
    draggable,
    FormItem,
    FormShow
  },
  data () {
    return {
      visible: false,
      FormModal: false,
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
    const route = useRoute()
    const initJson = async ()=>{
      const url = route.query.version ? '/formDefDeploy/preview' : `/formDef/get/${route.query.id}`
      let res = await post(url,{ formId:route.query.id, version:route.query.version })
      formConfig.initJson(res)
    }
    if(route.query.id) {
      initJson()
    }
    const saveAsDraft = async ()=>{
      console.log(formConfig.toJSON)
      if(route.query.id) {
        await post('/formDef/upsert',
          { projectName: 'oa',
            title: formConfig.formSet.formTitle,
            formDefJson: JSON.stringify(formConfig.toJSON) ,
            formId: formConfig.formSet.formId,
          })
        Message.success('已暂存为草稿')
      } else {
        let aaa = await post('/formDef/create',{ projectName:'oa',title:formConfig,formDefJson: JSON.stringify(formConfig.toJSON)  })
        console.log('aaa: ', aaa)
      }
    //   router.push({
    //     path: '/formShow',
    //   })
    }
    return {
      checkElement,
      formConfig,
      form,
      saveAsDraft,
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