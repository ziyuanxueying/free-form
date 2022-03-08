import { getModulesFiles } from '../../../../utils'

const modulesFiles = require.context('../others', true, /index\.vue$/)
const modules = getModulesFiles(modulesFiles)
const selects = {
  name:'扩展组件',
  components:modules
}
export default selects