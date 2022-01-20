import { getModulesFiles } from '../../../../utils'

const modulesFiles = require.context('../buttons', true, /index\.vue$/)
const modules = getModulesFiles(modulesFiles)
const buttonComponents = {
  name:'按钮型组件',
  components:modules
}
export default buttonComponents