let selectSetting = {
  fileId: 'select',
  label:'下拉框',
  placeholder: '请输入内容',
  defaultVal:null,
  required: false,
  disabled:false,
  hideLabel:false,
  remote: true ,
  columns: [
    { value: 'value', key: 'key', }
  ],
  remoteUrl:'/',
  keys: {
    key:'',
    value:''
  },
  remotePath:''
}
export default selectSetting