
export const settingName = 'NxText'

export const setting = [
  {
    type: 'NxInput',
    configList:{
      label:'字段标识',
      fileId:'fileId'
    }
  },
  //   {
  //     type: 'NxInput',
  //     configList:{
  //       label:'标签名称',
  //       fileId:'label',
  //     }
  //   },
  {
    type: 'NxInput',
    configList:{
      label:'文本内容',
      fileId:'defaultVal',
      placeholder:'请输入内容,不超过50字',
      maxLength: 50
    }
  },{
    type: 'NxSelect',
    configList:{
      label:'文本位置',
      fileId:'position',
      remote:false,
      defaultVal:'left',
      columns:[
        { value:'左对齐', key:'left' },
        { value:'居中',key:'center' },
        { value:'右对齐', key:'right' }
      ]
    }
  },
]
