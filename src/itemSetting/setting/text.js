
export const settingName = 'NxText'

export const setting = [
  {
    type: 'NxInput',
    configList:{
      label:'字段标识',
      fileId:'fileId'
    }
  },
  {
    type: 'NxInput',
    configList:{
      label:'标签名称',
      fileId:'label',
    }
  },{
    type: 'NxInput',
    configList:{
      label:'文本内容',
      fileId:'defaultVal',
      placeholder:'请输入内容,不超过50字',
      maxLength: 50
    }
  },{
    type: 'NxInput',
    configList:{
      label:'文本位置',
      fileId:'position',
    }
  },
  {
    type: 'NxSwitch',
    configList:{
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
