import { getModulesFiles } from '@utils'

const modulesFiles = require.context('../buttonComponents', true, /index\.vue$/)
const modules = getModulesFiles(modulesFiles)
const inputComponents = {
  name:'按钮型组件',
  components:modules
}
export default inputComponents