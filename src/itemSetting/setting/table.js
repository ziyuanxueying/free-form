
export const settingName = 'NxTable'

export const setting = [
//   {
//     type: 'NxSwitch',
//     configList:{
//       fileId:'remote',
//       label:'是否远程'
//     }
//   },
  {
    type: 'NxInput',
    configList:{
      label:'字段标识',
      fileId:'fileId',
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
