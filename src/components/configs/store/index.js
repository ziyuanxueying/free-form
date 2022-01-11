import { defineStore } from 'pinia'

export const useFormConfigStore = defineStore('formConfig', {
  state: () => {
    return { 
      //当前选中的表单组件id
      fieldId:null,
      //用于存放表单结构及组件样式
      formItemList: [],
      //用于存放表单全局样式
      formStyle:{
        hideLabel: false,
        labelWidth: '85px',
        labelPosition: 'right',
        showRequiredAsterisk: true,
        showVerificationMessage: true,
        size: 'medium',
        labelSuffix: ':'
      }
    }
  },
  getters: {
    toJSON () {
      return {
        fieldId: this.fieldId,
        formItemList: this.formItemList,
        formStyle: this.formStyle,
      }
    }, 
  },
})