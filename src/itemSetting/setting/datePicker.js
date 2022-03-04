
export const settingName = 'NxDatePicker'

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
      label:'标签名称',
      fileId:'label',
    }
  },{
    type: 'NxInput',
    configList:{
      label:'提示文字',
      fileId:'placeholder',
    }
  },
  {
    type: 'NxDatePicker',
    configList:{
      label:'默认值',
      fileId:'defaultVal',
    }
  },
  {
    type: 'NxInput',
    configList:{
      label:'日期格式',
      fileId:'format',
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
    type: 'NxSwitch',
    configList:{
      label:'隐藏标签',
      fileId:'hideLabel',
    }
  },
]
