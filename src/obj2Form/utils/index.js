/**
 * 根据组件列表获取form结构
 * @param {*} formItemList 组件列表
 * @param {Object} options options对象
 * @returns 
 */
// import { toRaw } from '@vue/reactivity'
import { post } from './request'
export function getForm (formItemList,options) {
  let form = {}
  formItemList.forEach(item=>{
    let configList = item.configList
    if(item.type === 'NxSelect') {
      if(configList.remote) {
        let fnc = ()=> post(configList.remoteUrl) 
        options[configList.fileId] = {
          fnc,
          remotePath:configList.remotePath,
          value:configList.keys.value,
          key:configList.keys.key
        }
      }else{
        options[configList.fileId] = configList.columns
      }
    }else{
    //布局组件
      if(configList.layout) {
        let obj = {}
        configList.layout.colContent.forEach((citem)=>{
          let res = getForm(citem,options)
          Object.assign(obj,res.form)
        })
        if(configList.layout.ifAdd) {
          form[configList.layout.fileId] = [obj]
        }else{
          Object.assign(form,obj)
        }
      }else{
        form[configList.fileId] = configList.defaultVal || null
      }
    }
  })
  return { form,options }
}