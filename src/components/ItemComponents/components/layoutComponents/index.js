import { getModulesFiles } from '@utils'

const modulesFiles = require.context('../layoutComponents', true, /index\.vue$/)
const modules = getModulesFiles(modulesFiles)
const inputComponents = {
  name:'布局型组件',
  components:modules
}
export default inputComponents