import { getModulesFiles } from '@utils'

const modulesFiles = require.context('../inputs', true, /index\.vue$/)
const modules = getModulesFiles(modulesFiles)
const inputComponents = {
  name:'输入型组件',
  components:modules
}
export default inputComponents