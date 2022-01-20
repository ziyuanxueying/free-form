export default [
  {
    type: 'NxInput',
    configList:{
      label:'表单标题',
      required: true,
      fileId:'formTitle',
    }
  },
  {
    type: 'NxInput',
    configList:{
      label:'表单ID',
      fileId:'formId',
      disabled: true 
    }
  }
]