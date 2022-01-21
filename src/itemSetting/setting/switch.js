
export const settingName = 'NxSwitch'

export const setting = [
  {
    type: 'NxInput',
    configList:{
      defaultValue: 'input',
      label:'字段标识',
      fileId:'fileId'
    }
    
  },{
    type: 'NxInput',
    configList:{
      defaultValue: '输入框',
      label:'字段标题',
      fileId:'label',
    }
  },
  {
    type: 'NxSwitch',
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
]
