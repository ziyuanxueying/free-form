let selectSetting = {
  fileId: 'select',
  label:'下拉框',
  placeholder: '请输入内容',
  defaultVal:'',
  required: false,
  disabled:false,
  hideLabel:false,
  remote: false ,
  multiple:false,
  columns: [
    { value: 'value', key: 'key', id:Math.random() }
  ],
  remoteUrl:'/',
  keys: {
    key:'',
    value:''
  },
  remotePath:'',
}
export default selectSetting