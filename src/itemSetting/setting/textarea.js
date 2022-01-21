
export const settingName = 'NxTextarea'

export const setting = [
  {
    type: 'NxInput',
    configList:{
      label:'字段标识',
      required: true,
      fileId:'fileId'
    }
  },
  {
    type: 'NxInput',
    configList:{
      defaultValue: '输入框',
      label:'字段标题',
      fileId:'label',
    }
  },
  {
    type: 'NxInputNum',
    configList:{
      label:'最大长度',
      fileId:'maxLength',
    }
  },
  {
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
]
