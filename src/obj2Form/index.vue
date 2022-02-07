<template>
  <div class="nx-form">
    <a-form :model="formData" class="nxf-layout-content-form">
      <FormItem :formObj="formConfig.formItemList" :formData="formData" :proxyOptions="proxyOptions"/>
    </a-form>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useFormConfigStore } from './../store'
// import { toRaw } from '@vue/reactivity'
import { getForm } from './utils'
import{ post } from '../tools/request'
import FormItem from './components/formItem.vue'
export default {
  components: {
    FormItem,
  },
  setup () {
    let proxyOptions = reactive({})
    let formData,formOptions
    const route = useRoute()
    const formConfig  = useFormConfigStore()
    const initJson = async ()=>{
      const url = route.query.version ? '/formDefDeploy/preview' : `/formDef/get/${route.query.id}`
      let res = await post(url,{ formId:route.query.id, version:route.query.version })
      formConfig.initJson(res)
      getFormObj()
    }
    route.query.id ? initJson() : formConfig.initJson({ formDefJson:'{}', })
    async function getFormObj () {
      //获取表单解构及所有原始options对象
      let form = getForm(formConfig.formItemList,{})
      console.log('form: ', form)
      //为表单数据添加响应
      formData = reactive(form.form)
      formOptions = form.options
      //解析原始options对象为可用options数组对象
      for(let p in formOptions) {
        try{
          proxyOptions[p] = await getOptions(formOptions[p])
        }
        catch(e) {
          proxyOptions[p] = []
        }
      }
    }
    async function getOptions (oldOptions) {
      if(!Array.isArray(oldOptions)) {
        try{
          //执行远程方法
          let res = await oldOptions.fnc()
          //根据路径解构数据
          let arr = res[oldOptions.remotePath].map(item=>{
            //重新定义option prop
            return {
              value:item[oldOptions.value],
              key:item[oldOptions.key]
            }
          })
          return arr
        }
        catch(e) {
          return []
        }
      }else{
        return oldOptions
      }
    }
    // getFormObj()
    return {
      formData,
      formOptions,
      getOptions,
      proxyOptions,
      formConfig,
    }
  },
}
</script>