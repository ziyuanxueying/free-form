


import {createStore} from 'vuex'
const requireModule = require.context('../pages', true, /store\/index\.js$/)
const modules = {}

 
requireModule.keys().forEach(fileName => {
  console.log("🚀 ~ file: index.js ~ line 10 ~ requireModule.keys ~ fileName", fileName)

  const moduleName = `store.${fileName.split(/\/store\//)[0].replace(/(\.\/)/g, '').replace(/\//g, '.')}`
  modules[moduleName] = {
    namespaced: true,
    ...requireModule(fileName).default
  }
})

console.log("🚀 ~ file: index.js ~ line 7 ~ modules", modules)

const store = createStore({
  modules
})

export default store