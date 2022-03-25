import { defineStore } from 'pinia'
// import{ post } from '@request'

export const useFormConfigStore = defineStore('formConfig', {
  state: () => {
    return { 
      //当前选中的表单组件id
      componentId:null,
      //用于存放表单结构及组件样式
      formItemList: [],
      //用于存放表单全局样式
      formSet:{
        formTitle: undefined,
        formId: undefined,
      },
      //流程控制
      pathSet:[],
      isPreview:false,
      moduleList:[],
      //关联信息库
      informationBase:'',
      //读写类型
      type:'',
      delList:[], //被删除的组件列表
      infobaseSet:{
        type: 0 ,// 新增，更新，停用
        informationBase: '' ,// 关联信息库ID
        moduleList:[],
        delList:[]
      }
    }
  },
  getters: {
    toJSON () {
      return {
        componentId: this.componentId,
        formItemList: this.formItemList,
        formSet: this.formSet,
        pathSet: this.pathSet,
        infobaseSet: this.infobaseSet,
      }
    }, 
    getPreview () {
      return this.isPreview 
    }
  },
  actions: {
    initJson (json) {
      this.fieldId = json.fieldId || ''
      this.formItemList = json.formItemList || []
      this.formSet = json.formSet  || {
        formTitle: undefined,
        formId: undefined,
      }
      this.pathSet = json.pathSet  || []
      this.infobaseSet = json.infobaseSet || {
        type: 0 ,// 新增，更新，停用
        informationBase: '' ,// 关联信息库ID
        moduleList:[],
        delList:[]
      }
    },
    setPreview (val) {
      this.isPreview = val
    },
    setModuleList (val) {
      this.infobaseSet.moduleList = val
    },
    setInformationBase (informationBase,type) {
      this.infobaseSet.informationBase = informationBase
      this.infobaseSet.type = type
    }
  }
})