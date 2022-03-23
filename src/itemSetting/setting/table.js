
export const settingName = 'NxTable'

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
      label:'标签名称',
      fileId:'label',
    }
    
  },
  {
    type: 'NxDoubleInput',
    configList:{
      columns:[{
        value: '1',
        key: '1',
      }],
      label:'表格头',
      fileId:'columns'
    }
  },
  
]
