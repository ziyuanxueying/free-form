
export const settingName = 'NxTable'

export const setting = [
  {
    type: 'NxSwitch',
    configList:{
      fileId:'remote',
      label:'是否远程'
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
