import ConfigPage from './configPage.vue'
import FormList from './formList.vue'

const components = {
  ConfigPage,
  FormList,
}

function install (Vue) {
  const keys = Object.keys(components)
  keys.forEach((name) => {
    const component = components[name]
    Vue.component(component.name || name, component)
  })
}

export default {
  install,
  ...components,
}

