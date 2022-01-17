
export const settingName = 'NxTextarea'

export const setting = [
  {
    type: 'NxInput',
    configList:{
      defaultValue: 'text',
      label:'字段标识',
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
    type: 'NxInput',
    configList:{
      label:'必填',
      fileId:'required',
    }
  },{
    type: 'NxInput',
    configList:{
      label:'最大长度',
      fileId:'maxLength',
    }
  },
]