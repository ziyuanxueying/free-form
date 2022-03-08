import { getModulesFiles } from '../../../../utils'

const modulesFiles = require.context('../module', true, /index\.vue$/)
const modules = getModulesFiles(modulesFiles)
const selects = {
  name:'基础组件',
  components:modules
}
export default selects