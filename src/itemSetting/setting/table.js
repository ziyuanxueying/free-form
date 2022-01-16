
export const settingName = 'NxTable'

export const setting = [
  {
    type: 'NxInput',
    configList:{
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
      label:'表格头',
      fileId:'columns'
    }
  },
  
]
