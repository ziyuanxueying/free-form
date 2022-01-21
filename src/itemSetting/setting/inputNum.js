
export const settingName = 'NxInputNum'

export const setting = [
  {
    type: 'NxInput',
    configList:{
      label:'字段标识',  
      required: true,
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
      label:'提示文案',
      fileId:'placeholder',
    }
  },
  {
    type: 'NxInputNum',
    configList:{
      label:'默认值',
      fileId:'defaultVal',
    }
  },
  {
    type: 'NxInputNum',
    configList:{
      label:'最小值',
      fileId:'min',
    }
  },
  {
    type: 'NxInputNum',
    configList:{
      label:'最大值',
      fileId:'max',
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
