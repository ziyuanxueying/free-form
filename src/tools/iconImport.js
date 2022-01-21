import {
  IconUpload,
  IconDelete,
  IconCopy,
} from '@arco-design/web-vue/es/icon'

const iconComponents = {
  IconUpload,
  IconDelete,
  IconCopy,
}

export default{
  install (app) {
    Object.keys(iconComponents).forEach(key => {
      app.component(key, iconComponents[key])
    }) 
  }
}