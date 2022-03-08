let userSetting = {
  fileId: 'NxUserList',
  label:'选择员工',
  required: false,
  disabled:false,
  hideLabel:false,
  remote: true ,
  remoteUrl:`${process.env.VUE_APP_BASE_URL}/user-api/user/search-compound`,
  keys: {
    key:'id',
    value:'enName'
  },
  remotePath:'data',
}
export default userSetting