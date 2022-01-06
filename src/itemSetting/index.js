const modulesFiles = require.context('./setting', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const file = modulesFiles(modulePath)
  const settingName = file.settingName
  const setting = file.setting
  modules[settingName] = setting
  return modules
},{})

export default modules