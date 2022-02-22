const modulesFiles = require.context('./components', true, /index\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // const moduleName = modulePath.replace(/^\.\/(.*)\/index\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  console.log('value: ', value)
  modules.push(value.default)
  return modules
}, [])
export default modules