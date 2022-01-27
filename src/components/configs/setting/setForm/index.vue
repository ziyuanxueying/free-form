<template>
  <div class="nx-form-setting">
    <div class="nx-form-setting-base">
      <div class="nx-form-setting-title">
        基础设置
      </div>
      <a-form :model="form" :label-col-props="{ span: 8 }" :wrapper-col-props="{span: 16}">
        <FormItem
          :element="item"
          :form="form"
          v-for="(item) in setting"
          :key="item.id"
          pageFrom="setform"
        />
      </a-form>
    </div>
    <div class="nx-form-setting-advance">
      <div class="nx-form-setting-title">
        高级设置
      </div>
      <AdvancedSetting/>
    </div>
    <div class="flex-between" style="margin-top: 10px;">
      <a-button type="outline" @click="saveAsDraft">
        存为草稿
      </a-button> 
      <a-button type="outline" @click="visible = true">
        表单发布
      </a-button> 
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import FormItem from '../../../FormItem'
import setForm from './baseSetting.js'
import AdvancedSetting from './advancedSetting'
import{ post } from '../../../../tools/request'
import { useFormConfigStore } from '../../../../store'
import { useRoute,useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'

export default {
  components: { 
    FormItem,
    AdvancedSetting 
  },
  setup () {
    let setting = ref([])
    let form = ref({})
    const formConfig  = useFormConfigStore()
    console.log('formConfig: ', formConfig)
    const init = ()=>{
      setForm.forEach(item=>{ item.id = Math.random() })
      setting.value = setForm
    }
    init()
    const router = useRouter()
    const route = useRoute()
    console.log('router: ', router,route)
    const saveAsDraft = async ()=>{
      console.log(formConfig.toJSON)
      if(route.query.id) {
        await post('/formDef/upsert',
          { projectName: 'oa',
            title: formConfig.formSet.formTitle,
            formDefJson: JSON.stringify(formConfig.toJSON) ,
            // formId: formConfig.formSet.formId,
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
      setting,
      init,
      saveAsDraft,
      form
    }
  },
}
</script>