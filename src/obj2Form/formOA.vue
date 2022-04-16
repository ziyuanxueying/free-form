<template>
  <div>
    <div class="flex-row">
      <a-form
        :model="formData"
        class="nxf-layout-form-pc"
        ref="formRef"
        :layout="innerWidth > 480 ? 'horizontal': 'vertical'"
      >
        <div class="form-title">
          {{ formTitle }}
        </div>
        <a-button
          v-if="infoBtn"
          class="info-choose"
          type="primary"
          @click="linkShow=true"
        >
          选择信息库
        </a-button>
        <a-form-item
          v-if="infoBtn"
          :label="`选择信息库`"
          :label-col-props="{xs:20,lg:span?span:4}"
          @click="linkShow=true"
        >
          <a-input :placeholder="`请选择`" readonly/>
        </a-form-item>
        <FormItem
          v-for="item in formObj"
          :key="item.configList.fileId ||item.componentId"
          :item="item"
          :formData="formData"
          :proxyOptions="proxyOptions"
          :pathSetObj="pathSetObj"
          :id="item.configList.fileId||item.componentId"
          :ifDisabled="ifDisabled"
          :formRef="formRef"
        />
      </a-form>
    </div>
    <ItemOaInfoModal
      v-if="infoBtn"
      v-model:linkShow="linkShow"
      v-model:ifDisabled="ifDisabled"
      :columns="columns"
      :formData="formData"
      :colShowList="colShowList"
      :infoMetaId="infoMetaId"
    />
  </div>
</template>
<script>
import { reactive, toRefs ,ref } from 'vue'
import { getForm,getField } from './utils'
import FormItem from './components/formItem.vue'
// import { Message } from '@arco-design/web-vue'
import _ from 'lodash'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import { useFormConfigStore } from '../store'
import { getTagData } from '../utils'
import ItemOaInfoModal from './components/itemOaInfoModal.vue'
import { useRoute } from 'vue-router'
export default {
  components: {
    FormItem,
    VueJsonPretty,
    ItemOaInfoModal,
  },
  setup () {
    const config = useFormConfigStore()
    let formStore = {}
    //form相关配置
    let formConfig = reactive({
      formObj:[],  //表单结构
      proxyOptions:{}, //转换格式后的下拉选项列表对象
      formData:{},  //表单数据
      formTitle:'',  //表单标题
      formRef: ref('formRef'),
      ifDisabled:false,
      columns:[],
      colShowList:[],
      linkShow: false,
      infoBtn: false,
      infoMetaId: undefined,
      innerWidth:0
    })
    formConfig.innerWidth =  window.innerWidth
    //存放原始表单数据，用于重置
    let resetFromData = {}
    let componentId2fileId = {}
    let pathSetObj = {}
    const route = useRoute()
    //初始化，获取表单结构及数据
    async function init () {
      getFormObj()
      getPathObj()
      getRelation(formConfig.formObj)
      if(formStore.infobaseSet?.type && formStore.infobaseSet.type !== '0') {
        formConfig.infoBtn = ['copy','edit'].includes(route.query.type)
        formConfig.infoMetaId = formStore.infobaseSet.oaChooseDataitem
        getInfoTablColumns()
      }
    }
    //获取表单绑定数据的数据结构
    async function getFormObj () {
      formConfig.formObj = formStore.formItemList
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
        } catch(e) {
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
      formStore.pathSet.forEach(item=>{
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
    function getRelation (list) {
      list.forEach(tem =>{
        if(tem.configList.layout) {
          tem.configList.layout.colContent.forEach((citem)=>{
            getRelation(citem)
          })
        } else {
          let res = _.find(formStore.relationTem.components,['orgComponentId',tem.configList.fileId])
          console.log('res: ', res)
          res && (tem.relation =  _.omit(res,['relationCompos']))
        }
      })
    }

    const handleOk = () => {
      return formConfig.formRef.validate()
    }
    
    function reset () {
      formConfig.formData = _.cloneDeep(resetFromData)
    }

    function getInfoTablColumns () {
      let { tagFormLink } =  getTagData({},config.infobaseSet,config.formItemList)
      tagFormLink = Object.values(tagFormLink)
      formConfig.colShowList = _.chain(formStore.infobaseSet.moduleList)
        .map((item)=>{ 
          if (!tagFormLink.includes(item.moduleName)) return null
          return { 
            colName:item.moduleName, 
            dataIndex:item.tagTableId || item.moduleName,
            tableName :item.tagTableId ,
          } 
        }).compact().value()
      formConfig.columns = _.uniqBy(formConfig.colShowList,'dataIndex')
      formConfig.ifDisabled = true
    }

    config.$onAction(({ store, })=>{
      setTimeout(() => {
        formStore = store.toJSON
        init()
      }, 0)
    })

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

.info-choose {
  margin-bottom: 10px;
  width: 150px;
}
</style>
