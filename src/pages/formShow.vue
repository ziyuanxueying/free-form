<template>
  <div>
    <a-form :model="formConfig.formSet" class="nxf-layout-content-form preview-form">
      <FormItem
        v-for="(element,index) in formConfig.formItemList "
        :element="element"
        :key="index"
        pageFrom="show"
      />
      <div class="flex-between">
        <a-button v-show="!history" type="outline" @click="formConfig.setPreview(false)">
          返回编辑
        </a-button>   
        <a-button v-show="history" type="outline" @click="saveAsRelease">
          发布版本
        </a-button>   
        <a-button type="outline" @click="checkJson ">
          查看格式
        </a-button>
      </div>
    </a-form>

    <a-modal
      :width="600"
      v-model:visible="visible"
      title="查看格式"
    >
      <a-typography>
        {{ jsonForm }}
      </a-typography>
    </a-modal>
  </div>
</template>

<script>
import { reactive, toRefs, defineComponent } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import FormItem from '../components/FormItem'
import { useFormConfigStore } from '../store'
import{ post } from '../tools/request'
import{ getForm } from '../utils'
import { Message } from '@arco-design/web-vue'

export default defineComponent({
  name:'FormShow',
  components: {
    FormItem
  },
  data () { return { } },
  setup () { 
    const state = reactive({ visible: false, jsonForm:{}, history:false })
    const formConfig  = useFormConfigStore()
    function checkJson () {
      state.visible = true
      state.jsonForm = getForm(formConfig.formItemList)
    }
    const route = useRoute()
    const router = useRouter()
    if(route.query.history) {
      formConfig.setPreview(true)
      state.history = route.query.history
    }
    const saveAsRelease = async ()=>{
      await post('/oa-platform/formDef/upsert',
        { projectName: 'oa',
          title: formConfig.formSet.formTitle,
          formDefJson: JSON.stringify(formConfig.toJSON) ,
          formId: formConfig.formSet.formId,
        })
      await post(`/formDefDeploy/deploy/${formConfig.formSet.formId}`)
      Message.success('表单已发布') 
      router.back(-1)
    }

    return {
      formConfig,
      checkJson,
      saveAsRelease,
      ...toRefs(state),
    }
  },
  mounted () {
  },
  methods:{

  },
})
</script>

<style lang="less" scoped>
.preview-form {
  margin: 20px auto;
  //   width: 600px;
}
</style>