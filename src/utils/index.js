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

export function getAllComponents () {
  const modulesFiles = require.context('@/components/ItemComponents', true, /index\.vue$/)
  const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const value = modulesFiles(modulePath)
    modules[value.default.name] = value.default
    return modules
  },{})
  return modules
}