export const settingName = 'NxCard'

export const setting = [
  {
    type: 'NxInput',
    configList:{
      label:'字段标识',
      fileId:'fileId',
    }
    
  },
  {
    type: 'NxSwitch',
    configList:{
      defaultValue: false,
      label:'是否可添加',
      fileId:'ifAdd',
    }
  }
]
