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
      isPreview:false, // 是否预览
      infobaseSet:{
        type: '0' ,// 新增，更新，停用
        informationBase: '' ,// 关联信息库ID
        moduleList:[],
        delList:[]
      },
      relationSet:{
        templates:[],//关联模板
        components:[ //设置组件
          {
            orgComponent:'',// 原组件
            relationType:'',// 关联类型 相等/统计
            relationTem:'',// 关联模板
            relationCompo:'',// 关联组件
            relationFunc:'',// 关联函数
          }
        ],
        curCompos:[]
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
        relationSet: this.relationSet,
      }
    }, 
    getPreview () {
      return this.isPreview 
    },
    getRelComponents () {
      return this.relationSet.components 
    },
  },
  actions: {
    initJson (json) {
      json.infobaseSet = JSON.stringify(json.infobaseSet) === '{}' ? undefined : json.infobaseSet
      this.componentId = json.componentId || ''
      this.formItemList = json.formItemList || []
      this.formSet = json.formSet  || { formTitle: undefined, formId: undefined, }
      this.pathSet = json.pathSet  || []
      this.infobaseSet = json.infobaseSet || {
        type: '0' ,// 新增，更新，停用
        informationBase: '' ,// 关联信息库ID
        moduleList:[],
        delList:[]
      }
      this.relationSet = json.relationSet || {
        templates:[],
        components:[],
        curCompos:[],
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
    },
    setRelationSet (tems,list,curCompos) {
      this.relationSet.templates = tems
      this.relationSet.components = list
      this.relationSet.curCompos = curCompos
    }
  }
})