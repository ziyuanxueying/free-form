let checkboxSetting = {
  fileId: 'checkbox',
  label:'复选框组',
  required: false,
  disabled:false,
  hideLabel:false,
  defaultVal:[],
  remote: false,
  columns: [{ value: 'value', key: 'key', id:Math.random() }],
  remoteUrl:'/',
  keys: {  key:'', value:'' },
  remotePath:''
}
export default checkboxSetting