import {
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconBug,
  IconBulb,
  IconUpload,
  IconDelete
} from '@arco-design/web-vue/es/icon'

const iconComponents = {
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconBug,
  IconBulb,
  IconUpload,
  IconDelete
}

export default{
  install (app) {
    Object.keys(iconComponents).forEach(key => {
      app.component(key, iconComponents[key])
    }) 
  }
}