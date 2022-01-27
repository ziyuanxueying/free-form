import { defineStore } from 'pinia'
// import{ post } from '@request'

export const useFormConfigStore = defineStore('formConfig', {
  state: () => {
    return { 
      //当前选中的表单组件id
      fieldId:null,
      //用于存放表单结构及组件样式
      formItemList: [],
      //用于存放表单全局样式
      formSet:{
        formTitle: undefined,
        formId: undefined,
      },
      //流程控制
      pathSet:[]
    }
  },
  getters: {
    toJSON () {
      return {
        fieldId: this.fieldId,
        formItemList: this.formItemList,
        formSet: this.formSet,
        pathSet: this.pathSet,
      }
    }, 
  },
  actions: {
    async initJson (res) {
      let json = JSON.parse(res.formDefJson) 
      console.log('res: ', res)
      this.fieldId = json.fieldId
      this.formItemList = json.formItemList
      this.formSet = json.formSet || this.formSet
      this.formSet.formId = res.formId
      this.formSet.formTitle = res.title
    } ,
  }
})