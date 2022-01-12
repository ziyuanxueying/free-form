
export const settingName = 'NxTable'

export const setting = [
  {
    type: 'NxInput',
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
      label:'表格头',
      fileId:'columns'
    }
  },
  
]
