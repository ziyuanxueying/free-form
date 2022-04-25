<template>
  <div v-if="!formConfig.isPreview" class="nxf-layout-content flex-between">
    <a-form :model="form" class="nxf-layout-content-form">
      <draggable
        v-model="formConfig.formItemList"
        group="NXFormGroup"
        :sort="true"
        class="nxf-layout-content-draggable"
        item-key="componentId"
      >
        <template #item="{element}">
          <div
            :class="{ 'nxf-layout-content-form-item':true,
                      'nxf-layout-content-form-item-active':element.componentId===formConfig.componentId }" 
            @click="checkElement(element)"
          >
            <FormItem :element="element" pageFrom="content"/>
          </div>
        </template>
      </draggable>
    </a-form>
    <div class="flex-column tabs-btn">
      <a-tooltip content="存为草稿">
        <a-button
          class="circle-btn"
          type="primary"
          shape="circle"
          @click="saveAsDraft('deaft')"
        >
          <icon-plus/>
        </a-button>
      </a-tooltip>
      <a-tooltip content="表单发布">
        <a-button
          class="circle-btn"
          type="primary"
          shape="circle"
          @click="saveAsDraft('release')"
        >
          <icon-subscribed/>
        </a-button>
      </a-tooltip>
      <a-tooltip content="表单预览">
        <a-button
          class="circle-btn"
          type="primary"
          shape="circle"
          @click="formConfig.setPreview(true)"
        >
          <icon-file-pdf/>
        </a-button>
      </a-tooltip>
      <a-tooltip content="查看Json">
        <a-button
          class="circle-btn"
          type="primary"
          shape="circle"
          @click="visible = true"
        >
          <icon-code-block/>
        </a-button>
      </a-tooltip>
    </div>
  </div>
  <FormShow v-else/>
  <a-modal
    :width="600"
    v-model:visible="visible"
    title="查看当前JSON"
  >
    <a-typography class="json-view">
      <vue-json-pretty :data="formConfig.toJSON" :showSelectController="true"/>
      <!-- <a-typography-paragraph copyable>
        <span class="copy"/>
      </a-typography-paragraph>
    </a-typography> -->
    </a-typography>
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
import { useRoute,useRouter } from 'vue-router'
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
      //存放当前选中的组件的componentId
      formConfig.componentId = element.componentId
    }
    let form = ref({})
    const route = useRoute()
    const initJson = async ()=>{
      const url = route.query.version ? '/oa-platform/formDefDeploy/preview' : `/oa-platform/formDef/get/${route.query.id}`
      let res = await post(url,{ formId:route.query.id, version:route.query.version })
      formConfig.initJson(JSON.parse(res.formDefJson))
    }
    route.query.id ? initJson() : formConfig.initJson({})
    formConfig.setPreview(Boolean(route.query.history))
    const router = useRouter()
    const saveAsRelease = async ()=>{
      await post(`/formDefDeploy/deploy/${formConfig.formSet.formId}`)
      Message.success('表单已发布') 
      router.back(-1)
    }
    const saveAsDraft = async (type)=>{
      if(formConfig.formSet.formId) {
        await post('/oa-platform/formDef/upsert',
          { projectName: 'oa',
            title: formConfig.formSet.formTitle,
            formDefJson: JSON.stringify(formConfig.toJSON) ,
            formId: formConfig.formSet.formId,
          })
        type === 'deaft' ? Message.success('已暂存为草稿') : saveAsRelease()
      } else {
        if(!formConfig.formSet.formTitle) return Message.warning('请填写表单标题')
        let id = await post('/oa-platform/formDef/create',{ projectName:'oa',title:formConfig.formSet.formTitle,formDefJson: JSON.stringify(formConfig.toJSON)  })
        formConfig.formSet.formId = id
        type === 'deaft' ? Message.success('已暂存为草稿') : saveAsRelease()
      }
      return true
    }
    
    // 初始化时自动滚动到底部
    setTimeout(() => {
      let msg = document.getElementsByClassName('nxf-layout-content-form')[0] 
      msg.scrollTop = msg.scrollHeight
    }, 500)

    return {
      checkElement,
      formConfig,
      form,
      saveAsDraft,
      saveAsRelease,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="less" scoped>
.arco-btn {
  margin-left: 10px;
}

.json-view {
  overflow: auto;
  height: 800px;
}

.copy {
  &::before {
    content: 'JSON 复制';
  }
}
</style>