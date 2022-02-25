/**
 * 根据files返回指定格式的组件list
 * @param {*} modulesFiles 文件列表
 * @returns 
 */
export function getModulesFiles (modulesFiles) {
  const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const value = modulesFiles(modulePath)
    const moduleName = value.default.nameCN
    const setting = value.setting
    const type = value.default.name
    let item = {
      name:type,
      icon:value.default.icon,
      moduleName: moduleName,
      configList: setting,
      type
    }
    modules.push(item)
    return modules
  }, [])
  return modules
}
/**
 * 获取全部组件
 */
export function getAllComponents () {
  const formModulesFiles = require.context('../components/ItemComponents', true, /index\.vue$/)
  const settingModulesFiles = require.context('../components/FormItem', true, /index\.vue$/)
  const formModules = formModulesFiles.keys().reduce((modules, modulePath) => {
    const value = formModulesFiles(modulePath)
    modules[value.default.name] = value.default
    return modules
  },{})
  const allModules = settingModulesFiles.keys().reduce((modules, modulePath) => {
    const value = settingModulesFiles(modulePath)
    modules[value.default.name] = value.default
    return modules
  },formModules)

  console.log('allModules: ', allModules)
  return allModules
}
/**
 * 获取数组中的指定对象
 * @param {*} arr 数组
 * @param {*} componentId id
 * @returns 
 */
export function getComponentsObj (arr,componentId) {
  for(let i = 0; i < arr.length; i++) {
    let item = arr[i]
    if(item.componentId === componentId) {
      return  {
        obj:item,
        parentArr:arr,
        index:i
      }
    }else{
      if(item.configList.layout) {
        let colContent = item.configList.layout.colContent
        for(let i = 0; i < colContent.length; i++) {
          let res = getComponentsObj(colContent[i],componentId)
          if(res) {
            return res
          }
        }
      }
    }
  }
  return false
}
/**
 * 根据组件列表获取树状结构
 * @param {*} formItemList 组件列表
 * @returns 
 */
export function getTree (formItemList,disabled) {
  let treeData = []
  formItemList.forEach(item=>{
    // console.log(1111,toRaw(item.configList))
    let obj = null
    if(item.configList.layout) {
      obj =  {
        title: item.configList.layout.label || item.moduleName,
        key: item.componentId,
        children:[],
        disabled: disabled,
      }
      item.configList.layout.colContent.forEach((citem,index)=>{
        obj.children.push({
          title: `容器${index + 1}`,
          key: `${item.componentId}-${index}`,
          children:getTree(citem),
          disabled: disabled,
        })
      })
    }else{
      if(item.configList.label === '文本框') return
      obj =  {
        title: item.configList ? item.configList.label : undefined,
        key: item.configList ? item.componentId : undefined,
      }
    }
    treeData.push(obj)
  })
  return treeData
}
/**
 * 根据组件列表获取form结构
 * @param {*} formItemList 组件列表
 * @returns 
 */
// import { toRaw } from '@vue/reactivity'
export function getForm (formItemList) {
  let form = {}
  formItemList.forEach(item=>{
    let configList = item.configList
    //布局组件
    if(configList.layout) {
      let obj = {}
      configList.layout.colContent.forEach((citem)=>{
        let cForm = getForm(citem)
        Object.assign(obj,cForm)
      })
      if(configList.layout.ifAdd) {
        form[configList.layout.fileId] = [obj]
      }else{
        Object.assign(form,obj)
      }
    }else{
      if(configList.multiple) {
        form[configList.fileId] = []
      }else{
        form[configList.fileId] = configList.defaultVal
      }
    }
  })
  return form
}
