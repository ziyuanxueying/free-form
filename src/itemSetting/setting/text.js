
export const settingName = 'NxText'

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
      defaultValue: '请输入内容,不超过50字',
      label:'文本内容',
      fileId:'defaultContent',
      maxLength: 50
    }
  },{
    type: 'NxSwitch',
    configList:{
      defaultValue: false,
      label:'必填',
      fileId:'required',
    }
  },{
    type: 'NxInput',
    configList:{
      defaultValue: 'left',
      label:'文本位置',
      fileId:'position',
    }
  }
]
