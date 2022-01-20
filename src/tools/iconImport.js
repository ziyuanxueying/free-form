import {
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconBug,
  IconBulb,
  IconUpload
} from '@arco-design/web-vue/es/icon'

const iconComponents = {
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconBug,
  IconBulb,
  IconUpload
}

export default{
  install (app) {
    Object.keys(iconComponents).forEach(key => {
      app.component(key, iconComponents[key])
    }) 
  }
}