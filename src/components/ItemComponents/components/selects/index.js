import { getModulesFiles } from '../../../../utils'

const modulesFiles = require.context('../selects', true, /index\.vue$/)
const modules = getModulesFiles(modulesFiles)
const selects = {
  name:'选择型组件',
  components:modules
}
export default selects