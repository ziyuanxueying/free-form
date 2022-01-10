
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
    type: 'NxInput',
    configList:{
      defaultValue: 'false',
      label:'必填',
      fileId:'required',
    }
  }
]
