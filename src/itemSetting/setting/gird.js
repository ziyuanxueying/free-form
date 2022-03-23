
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
    type: 'NxDoubleInput',
    configList:{
      label:'列',
      fileId:'colCount',
      columns:[],
      placeholderLeft:'span',
      placeholderRight:'offset',
    }
  }
]
