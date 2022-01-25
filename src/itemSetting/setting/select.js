
export const settingName = 'NxSelect'

export const setting = [
  {
    type: 'NxInput',
    configList:{
      defaultValue: 'input',
      label:'字段标识',
      fileId:'fileId'
    }
    
  },{
    type: 'NxInput',
    configList:{
      defaultValue: '输入框',
      label:'字段标题',
      fileId:'label',
    }
  },{
    type: 'NxInput',
    configList:{
      defaultValue: '请输入内容',
      label:'默认值',
      fileId:'placeholder',
    }
  },{
    type: 'NxSwitch',
    configList:{
      label:'必填',
      fileId:'required',
    }
  },{
    type: 'NxSwitch',
    configList:{
      label:'是否远程',
      fileId:'remote',
    }
  },
  {
    type: 'NxDoubleInput',
    configList:{
      columns:[{
        value: '',
        key: '',
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
