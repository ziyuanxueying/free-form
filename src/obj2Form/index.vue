<template>
  <div class="nx-form">
    <a-form :model="formData" class="nxf-layout-content-form">
      <FormItem
        v-for="item in formObj"
        :key="item.configList.fileId"
        :item="item"
        :formData="formData"
        :proxyOptions="proxyOptions"
        :pathSetObj="pathSetObj"
      />
    </a-form>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'
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
    //form相关配置
    let formConfig = reactive({
      formObj:[],  //表单结构
      proxyOptions:{}, //转换格式后的下拉选项列表对象
      formData:{},  //表单数据
    })
    const route = useRoute()
    const formStore = useFormConfigStore()

    const initJson = async ()=>{
      const url = route.query.version ? '/formDefDeploy/preview' : `/formDef/get/${route.query.id}`
      let res = await post(url,{ formId:route.query.id, version:route.query.version })
      formStore.initJson(res)
      getFormObj()
    }
    route.query.id ? initJson() : formStore.initJson({ formDefJson:'{}', })

    let componentId2fileId = {}
    let pathSetObj = {}
    async function getFormObj () {
      formConfig.formObj = useFormConfigStore().formItemList
      //获取表单解构及所有原始options对象
      let form = getForm(formConfig.formObj,{})
      //为表单数据添加响应
      formConfig.formData = form.form
      componentId2fileId = form.componentId2fileId
      //解析原始options对象为可用options数组对象
      for(let p in form.options) {
        try{
          formConfig.proxyOptions[p] = await getOptions(form.options[p])
        }
        catch(e) {
          formConfig. proxyOptions[p] = []
        }
      }
      getPathObj()
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
    function getPathObj () {
      useFormConfigStore().pathSet.forEach(item=>{
        let prop = componentId2fileId[item.childProp]
        if(!pathSetObj[prop]) {
          pathSetObj[prop] = {}
        }
        pathSetObj[prop][item.action] = {
          parentProp:componentId2fileId[item.parentProp],
          equation:item.equation,
          value:item.value
        }
      })

      console.log(pathSetObj)
    }
    return {
      ...toRefs(formConfig),
      pathSetObj
    }
  },
}
</script>