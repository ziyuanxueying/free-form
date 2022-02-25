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
    }
  },
  getters: {
    toJSON () {
      return {
        componentId: this.componentId,
        formItemList: this.formItemList,
        formSet: this.formSet,
        pathSet: this.pathSet,
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
      this.formSet = json.formSet  || {}
      this.pathSet = json.pathSet  || []
    },
    setPreview (val) {
      this.isPreview = val
    }
  }
})