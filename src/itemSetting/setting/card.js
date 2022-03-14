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
    type: 'NxInput',
    configList:{
      label:'标签名称',
      fileId:'label',
    }
    
  },
  {
    type: 'NxSwitch',
    configList:{
      label:'是否可添加',
      fileId:'ifAdd',
    }
  }
]
