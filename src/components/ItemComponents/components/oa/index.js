import { getModulesFiles } from '../../../../utils'

const modulesFiles = require.context('../oa', true, /index\.vue$/)
const modules = getModulesFiles(modulesFiles)
const selects = {
  name:'申请人组件',
  components:modules
}
export default selects