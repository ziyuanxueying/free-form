
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
      label:'标签名称',
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
    type: 'NxInput',
    configList:{
      defaultValue: 'left',
      label:'文本位置',
      fileId:'position',
    }
  },
  {
    type: 'NxSwitch',
    configList:{
      defaultValue: false,
      label:'必填',
      fileId:'required',
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
