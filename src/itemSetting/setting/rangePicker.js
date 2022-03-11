
export const settingName = 'NxRangePicker'

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
    type: 'NxSelect',
    configList:{
      label:'日期格式',
      fileId:'format',
      remote: false,
      columns: [
        { value: 'YYYY-MM-DD', key:'' },
        { value: 'YYYY/MM/DD', key:'' },
        { value: 'YYYY-MM-DD HH:mm:ss', key:'' },
        { value: 'YYYY/MM/DD HH:mm:ss', key:'' },
      ],
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
  {
    type: 'NxSwitch',
    configList:{
      label:'隐藏标签',
      fileId:'hideLabel',
    }
  },
  {
    type: 'NxSwitch',
    configList:{
      label:'是否显示时间',
      fileId:'showTime',
    }
  },
]
