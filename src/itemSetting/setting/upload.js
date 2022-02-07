
export const settingName = 'NxUpload'

export const setting = [
  {
    type: 'NxInput',
    configList:{
      label:'字段标识',
      fileId:'fileId',
    }
    
  },{
    type: 'NxInput',
    configList:{
      label:'标签名称',
      fileId:'label',
    }
  },
  {
    type: 'NxInput',
    configList:{
      label:'按钮文本',
      fileId:'text',
    }
  },
  {
    type: 'NxInputNum',
    configList:{
      label:'最大数量',
      fileId:'maxCount',
    }
  },
  {
    type: 'NxInput',
    configList:{
      label:'上传地址',
      fileId:'action',
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
      label:'隐藏标签',
      fileId:'hideLabel',
    }
  },
]
