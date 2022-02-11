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
  let componentId2fileId = {}
  formItemList.forEach(item=>{
    console.log('item: ', item)
    let configList = item.configList
    item.hideLabel = configList.layout ? configList.layout.hideLabel : configList.hideLabel
    if(item.type === 'NxSelect' || item.type === 'NxCheckbox') {
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
    }
    //布局组件
    if(configList.layout) {
      let obj = {}
      //存放id映射关系
      let componentId2fileIdObj = {}
      //遍历布局组件子节点
      configList.layout.colContent.forEach((citem)=>{
        //循环迭代，获取子节点form结构
        let res = getForm(citem,options)
        Object.assign(obj,res.form)
        Object.assign(componentId2fileIdObj,res.componentId2fileId)
      })
      if(configList.layout.ifAdd) {
        form[configList.layout.fileId] = [obj]
        componentId2fileId[item.componentId] = configList.layout.fileId
      }else{
        Object.assign(form,obj)
        Object.assign(componentId2fileId,componentId2fileIdObj)
      }
    }else{
      if(configList.multiple) {
        form[configList.fileId] = []
      }else{
        console.log(configList.fileId,configList.defaultVal,11111111111111111)
        form[configList.fileId] = configList.defaultVal
      }
    }
    componentId2fileId[item.componentId] = configList.fileId || item.componentId
  })
  return { form,options,componentId2fileId }
}


//采用递归读取对象的属性值
export function getField (data,fields) {
  let arr = fields.split('.')
  let key = arr.shift()
  let value = data[key]
 
  if(value === null) {
    return value
  }else if(arr.length === 0) {
    return value
  }
 
  let result = getField(value,arr.join('.'))
  return result
}