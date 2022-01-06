import { getModulesFiles } from '@utils'

const modulesFiles = require.context('../selectComponents', true, /index\.vue$/)
const modules = getModulesFiles(modulesFiles)
const inputComponents = {
  name:'选择型组件',
  components:modules
}
export default inputComponents