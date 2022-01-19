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
        hideLabel: false,
        labelWidth: '85px',
        labelPosition: 'right',
        showRequiredAsterisk: true,
        showVerificationMessage: true,
        size: 'medium',
        labelSuffix: ':',
        formTitle: undefined,
        formId: undefined,
      }
    }
  },
  getters: {
    toJSON () {
      return {
        fieldId: this.fieldId,
        formItemList: this.formItemList,
        formSet: this.formSet,
      }
    }, 
  },
  actions: {
    async initJson (res) {
      res = JSON.parse(res)
      this.fieldId = res.fieldId
      this.formItemList = res.formItemList
      this.formSet = res.formSet || this.formSet
    } ,
  }
})