
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
  },{
    type: 'NxSwitch',
    configList:{
      label:'必填',
      fileId:'required',
    }
  },{
    type: 'NxInputNum',
    configList:{
      label:'最大长度',
      fileId:'maxLength',
    }
  },
]
