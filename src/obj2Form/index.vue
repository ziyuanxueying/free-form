<template>
  <div>
    <div class="flex-row">
      <a-form
        :model="formData"
        class="nxf-layout-form-pc"
        ref="formRef"
        auto-label-width 
      >
        <div class="form-title">
          {{ formTitle }}
        </div>
        <FormItem
          v-for="item in formObj"
          :key="item.configList.fileId"
          :item="item"
          :formData="formData"
          :proxyOptions="proxyOptions"
          :pathSetObj="pathSetObj"
          :id="item.configList.fileId||item.componentId"
        />
        <a-space class="flex-row-center">
          <a-button html-type="submit">
            提交
          </a-button>
          <a-button @click="reset">
            重置
          </a-button>
        </a-space>
      </a-form>
      <div class="json-view">
        <span class="form-title">
          JSON格式
        </span>
        <vue-json-pretty :data="formData" :showSelectController="true"/>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs ,ref } from 'vue'
import { useRoute } from 'vue-router'
import { getForm,getField } from './utils'
import FormItem from './components/formItem.vue'
import{ post } from './../tools/request'
import { Message } from '@arco-design/web-vue'
import _ from 'lodash'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
export default {
  components: {
    FormItem,
    VueJsonPretty,
  },
  setup () {
    let useFormConfigStore = {}
    //form相关配置
    let formConfig = reactive({
      formObj:[],  //表单结构
      proxyOptions:{}, //转换格式后的下拉选项列表对象
      formData:{},  //表单数据
      formTitle:'',  //表单标题
      formRef: ref('formRef'),
    })
    //存放原始表单数据，用于重置
    let resetFromData = {}
    let componentId2fileId = {}
    let pathSetObj = {}
    init()
    //初始化，获取表单结构及数据
    async function init () {
      const route = useRoute()
      //根据表单id及版本号获取表单结构
      const configUrl = '/oa-platform/formDefDeploy/preview'
      let res = await post(configUrl,{ formId:route.query.id, version:route.query.version })
      //   formConfig.formTitle = res.title
      if(res.formDefJson) {
        useFormConfigStore = JSON.parse(res.formDefJson)
      }
      getFormObj()
      getPathObj()
      let type = route.query.type
      //编辑录入内容
      if(type === 'edit') {
        Message.success('行为:编辑')
        Message.success(`地址:${useFormConfigStore.formSet.formPath}`)
        Message.success(`参数:${route.query}`)
        Message.success(`数据路径:${useFormConfigStore.formSet.dataPath}`)
      }
    }
    //获取表单绑定数据的数据结构
    async function getFormObj () {
      formConfig.formObj = useFormConfigStore.formItemList
      //获取表单解构及所有原始options对象
      let form = getForm(formConfig.formObj,{})
      //为表单数据添加响应
      formConfig.formData = form.form
      resetFromData = _.cloneDeep(form.form)
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
    }
    //执行select远程操作获取options数组
    async function getOptions (oldOptions) {
      if(!Array.isArray(oldOptions)) {
        try{
          //执行远程方法
          let res = await oldOptions.fnc()
          //根据路径解构数据
          let data = getField(res,oldOptions.remotePath)
          let arr = data.map(item=>{
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
    //拼接流程对象
    function getPathObj () {
      useFormConfigStore.pathSet.forEach(item=>{
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
    }

    const handleOk = () => {
      formConfig.formRef.validate().then((res) => {
        console.log('res: ', res)
      })
    }

    function reset () {
      formConfig.formData = _.cloneDeep(resetFromData)
    }
    return {
      ...toRefs(formConfig),
      pathSetObj,
      handleOk,
      reset,
    }
  },
}
</script>
<style lang="less" scoped>
@import url('../style/obg2form.less');
</style>