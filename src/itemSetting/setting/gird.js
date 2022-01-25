
export const settingName = 'NxGrid'

export const setting = [
  {
    type: 'NxInput',
    configList:{
      label:'字段标识',
      fileId:'fileId',
    }
    
  },
  {
    type: 'NxInput',
    configList:{
      defaultValue: 1,
      label:'列数量',
      fileId:'colCount',
      placeholder:'请输入1-24'
    }
  }
]
