import { getModulesFiles } from '../../../../utils'

const modulesFiles = require.context('../selects', true, /index\.vue$/)
const modules = getModulesFiles(modulesFiles)
const selects = {
  name:'OA组件',
  components:modules
}
export default selects