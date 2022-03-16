
export const settingName = 'NxGrid'

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
    
  },
  {
    type: 'NxInputNum',
    configList:{
      label:'列数量',
      fileId:'colCount',
      placeholder:'请输入1-4',
      min: 1,
      max: 4,
    }
  }
]
