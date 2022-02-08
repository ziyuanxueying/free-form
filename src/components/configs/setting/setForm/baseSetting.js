export default [
  {
    type: 'NxInput',
    configList:{
      label:'表单标题',
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
  },
  {
    type: 'NxInput',
    configList:{
      label:'回显路径',
      fileId:'formPath',
    }
  },
  {
    type: 'NxInput',
    configList:{
      label:'数据路径',
      fileId:'dataPath',    
    }
  },
  {
    type: 'NxInput',
    configList:{
      label:'提报路径',
      fileId:'submitPath',    
    }
  }
]