
export const settingName = 'NxInput'

export const setting = [
  {
    type: 'NxInput',
    configList:{
      label:'字段标识',
      fileId:'fileId',
    }
    
  },{
    type: 'NxInput',
    configList:{
      label:'字段标题',
      fileId:'label',
    }
  },{
    type: 'NxInput',
    configList:{
      label:'占位符',
      fileId:'placeholder',
    }
  },
  {
    type: 'NxInput',
    configList:{
      label:'默认值',
      fileId:'defaultVal',
    }
  },
  {
    type: 'NxSwitch',
    configList:{
      label:'是否必填',
      fileId:'required',
    }
  },
  {
    type: 'NxSwitch',
    configList:{
      label:'是否禁用',
      fileId:'disabled',
    }
  },
  {
    type: 'NxInput',
    configList:{
      label:'正则匹配',
      fileId:'match',
    }
  },
  {
    type: 'NxInput',
    configList:{
      label:'正则错误提示',
      fileId:'matchMsg',
    }
  },
]
