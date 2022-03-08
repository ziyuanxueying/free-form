import { getModulesFiles } from '../../../../utils'

const modulesFiles = require.context('../base', true, /index\.vue$/)
const modules = getModulesFiles(modulesFiles)
const selects = {
  name:'基础组件',
  components:modules
}
export default selects