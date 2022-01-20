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
  const formModulesFiles = require.context('@/components/ItemComponents', true, /index\.vue$/)
  const settingModulesFiles = require.context('@/components/FormItem', true, /index\.vue$/)
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

  return allModules
}
/**
 * 获取数组中的指定对象
 * @param {*} arr 数组
 * @param {*} fieldId id
 * @returns 
 */
export function getComponentsObj (arr,fieldId) {
  console.log('getComponentsObj arr,fieldId: ', arr,fieldId)
  for(let i = 0; i < arr.length; i++) {
    let item = arr[i]
    if(item.fieldId === fieldId) {
      return  {
        obj:item,
        parentArr:arr,
        index:i
      }
    }else{
      if(item.configList.layout) {
        let colContent = item.configList.layout.colContent
        for(let i = 0; i < colContent.length; i++) {
          let res = getComponentsObj(colContent[i],fieldId)
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
// import { toRaw } from '@vue/reactivity'
export function getTree (formItemList) {
  let treeData = []
  formItemList.forEach(item=>{
    // console.log(1111,toRaw(item.configList))
    let obj = null
    if(item.configList.layout) {
      obj =  {
        title: item.moduleName,
        key: item.moduleName + Math.random(),
        children:[],
        disabled: true,
      }
      item.configList.layout.colContent.forEach((citem,index)=>{
        obj.children.push({
          title: `容器${index + 1}`,
          key: Math.random(),
          children:getTree(citem),
          disabled: true,
        })
      })
    }else{
      obj =  {
        title: item.configList?.label,
        key: item.configList?.fileId,
      }
    }
    treeData.push(obj)
  })
  console.log('treeData',treeData)
  return treeData
}