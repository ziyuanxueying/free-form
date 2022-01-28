import {
  IconUpload,
  IconDelete,
  IconCopy,
  IconLanguage,
} from '@arco-design/web-vue/es/icon'

const iconComponents = {
  IconUpload,
  IconDelete,
  IconCopy,
  IconLanguage,
}

export default{
  install (app) {
    Object.keys(iconComponents).forEach(key => {
      app.component(key, iconComponents[key])
    }) 
  }
}