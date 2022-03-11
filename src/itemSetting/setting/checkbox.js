
export const settingName = 'NxCheckbox'

export const setting = [
  {
    type: 'NxInput',
    configList:{
      defaultValue: 'input',
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
      label:'是否远程',
      fileId:'remote',
    }
  },
  {
    type: 'NxWatchCheckbox',
    configList:{
      label:'默认值',
      fileId:'defaultVal',
    }
  },
  {
    type: 'NxDoubleInput',
    configList:{
      columns:[{
        value: '',
        key: '',
        id:Math.random()
      }],
      label:'选项',
      fileId:'columns'
    }
  },
  {
    type: 'NxRemoteData',
    configList:{
      label:'对应字段',
      fileId:'remoteUrl'
    }
  },
]
