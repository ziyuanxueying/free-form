/**
 * 根据files返回指定格式的组件list
 * @param {*} modulesFiles 文件列表
 * @returns 
 */
export function getModulesFiles (modulesFiles) {
  const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const value = modulesFiles(modulePath)
    const moduleName = value.default.nameCN
    const setting = value.setting
    const type = value.default.name
    // if(setting.fileId) { 
    //   setting.fileId =  `${setting.fileId}_${new Date().getTime()}`
    // } else {
    //   setting.layout.fileId = `${setting.layout.fileId}_${new Date().getTime()}`
    // }
    let item = {
      name:type,
      icon:value.default.icon,
      moduleName: moduleName,
      configList: setting,
      type
    }
    modules.push(item)
    return modules
  }, [])
  return modules
}
/**
 * 获取全部组件
 */
export function getAllComponents () {
  const formModulesFiles = require.context('../components/ItemComponents', true, /index\.vue$/)
  const settingModulesFiles = require.context('../components/FormItem', true, /index\.vue$/)
  const formModules = formModulesFiles.keys().reduce((modules, modulePath) => {
    const value = formModulesFiles(modulePath)
    modules[value.default.name] = value.default
    return modules
  },{})
  const allModules = settingModulesFiles.keys().reduce((modules, modulePath) => {
    const value = settingModulesFiles(modulePath)
    modules[value.default.name] = value.default
    return modules
  },formModules)

  return allModules
}
/**
 * 获取数组中的指定对象
 * @param {*} arr 数组
 * @param {*} componentId id
 * @returns 
 */
export function getComponentsObj (arr,componentId) {
  for(let i = 0; i < arr.length; i++) {
    let item = arr[i]
    if(item.componentId === componentId) {
      return  {
        obj:item,
        parentArr:arr,
        index:i
      }
    }else{
      if(item.configList.layout) {
        let colContent = item.configList.layout.colContent
        for(let i = 0; i < colContent.length; i++) {
          let res = getComponentsObj(colContent[i],componentId)
          if(res) {
            return res
          }
        }
      }
    }
  }
  return false
}
/**
 * 根据组件列表获取树状结构
 * @param {*} formItemList 组件列表
 * @returns 
 */
export function getTree (formItemList,disabled,tip = '',nodePathArray = ['root']) {
  let treeData = []
  formItemList.forEach(item=>{
    // console.log(1111,toRaw(item.configList))
    let obj = null
    if(item.configList.layout) {
      let mtip = tip
      //重复表的判断条件
      let condition = item.type === 'NxTable' || (item.type === 'NxCard' && item.configList.layout.ifAdd)
      if(condition) {
        mtip = '(重复表)'
      }
      obj =  {
        title: item.configList.layout.label || item.moduleName,
        key: item.componentId,
        children:[],
        disabled: disabled,
        nodePathArray:[].concat(nodePathArray,item.componentId)
      }
      // eslint-disable-next-line no-unused-vars
      item.configList.layout.colContent.forEach((citem,index)=>{
        //重复表需要把当前节点添加进去
        let _parentId = condition ? [].concat(nodePathArray,item.componentId) : [].concat(nodePathArray)
        let _childNode = getTree(citem,disabled,mtip,_parentId)
        obj.children = obj.children.concat(_childNode)
        // obj.children.push({
        //   title: `容器${index + 1}`,
        //   key: `${item.componentId}-${index}`,
        //   children:getTree(citem,disabled,mtip,_parentId),
        //   disabled: disabled,
        // })
      })
    }else{
      if(item.configList.label === '文本框') return
      obj =  {
        title: item.configList ? item.configList.label + tip : undefined,
        key: item.configList ? item.componentId : undefined,
        nodePathArray:[].concat(nodePathArray,item.componentId)
      }
    }
    treeData.push(obj)
  })
  return treeData
}
/**
 * 根据组件列表获取form结构
 * @param {*} formItemList 组件列表
 * @returns 
 */
// import { toRaw } from '@vue/reactivity'
export function getForm (formItemList) {
  let form = {}
  formItemList.forEach(item=>{
    let configList = item.configList
    //布局组件
    if(configList.layout) {
      let obj = {}
      configList.layout.colContent.forEach((citem)=>{
        let cForm = getForm(citem)
        Object.assign(obj,cForm)
      })
      if(configList.layout.ifAdd) {
        form[configList.layout.fileId] = [obj]
      }else{
        Object.assign(form,obj)
      }
    }else{
      if(configList.multiple) {
        form[configList.fileId] = []
      }else{
        form[configList.fileId] = configList.defaultVal
      }
    }
  })
  return form
}
/**
 * 判断是否存在重复id
 */
export function checkId (formItemList,arr = []) {
  formItemList.forEach(item=>{
    let configList = item.configList
    if(!configList.layout) {
      arr.push(configList.fileId)
    }else{
      arr.push(configList.layout.fileId)
      configList.layout.colContent.forEach(citem=>{
        checkId(citem,arr)
      })
    }
  })
  return arr
}
/**
 * 获取表单中所有组件的componentId
 */
import { useFormConfigStore } from '../store'
const formConfig  = useFormConfigStore()
export function getAllComponentId (arr = formConfig.formItemList,ids = []) {
  arr.forEach(item=>{
    ids.push(item.componentId)
    if(item.configList.layout) {
      item.configList.layout.colContent.forEach(citem=>{
        getAllComponentId(citem,ids)
      })
    }
  })
  return ids
}

/**
 * 校验信息库中的绑定字段是否都存在
 */
export function ifExist () {
  
  let fieldIdList = formConfig.infobaseSet.moduleList.filter(item=>item.fileId)
  let ids = getAllComponentId()
  let delList = []
  let res = false  //是否有被关联的节点被删除
  fieldIdList.forEach(item=>{
    if(!ids.includes(item.fileId)) {
      delList.push(item.fileId)
    }
  })
  if(delList.length > 0) {
    res = true // 有节点被删除
  }
  formConfig.delList = delList
  return{
    res,
    delList // 被删除的节点列表
  }
}

export function getNodeRoute (tree, targetId) {
  let nodePathArray = []
  // eslint-disable-next-line consistent-return
  function fn (tree, targetId) {
    for (let index = 0; index < tree.length; index++) {
      if (tree[index].children) {
        fn(tree[index].children, targetId)
      }
      if (tree[index].key === targetId) {
        nodePathArray = tree[index].nodePathArray
      }
    }
  }
  fn(tree, targetId)
  return nodePathArray
}

//根据信息库映射和提交数据获取传入信息库数据
export function getTagData (formData,mapList,formItemList) {
  let _mapList = mapList.moduleList.filter(item=>item.fileId)
  let CidToFid = getComponentIdbyFileId(formItemList)
  let _obj = {}
  //遍历生成field-tagId的对应关系
  for(let p in CidToFid) {
    _mapList.forEach(citem=>{
      if(CidToFid[p].id === citem.fileId) {
        _obj[p] = citem.tagId
        if(citem.tagTableId) {
          _obj[CidToFid[p].parentId] = citem.tagTableId
        }
      }
    })
  }
  //遍历formData，获取tagId formData
  let tagFormData = _getTagForm(formData)
  function _getTagForm (formData) {
    let _tagFormData = {}
    for(let p in formData) {
      if(Array.isArray(formData[p])) {
        _tagFormData[_obj[p]] = []
        formData[p].forEach(citem=>{
          let res = _getTagForm(citem)
          _tagFormData[_obj[p]].push(res)
        })
      }else{
        if(_obj[p]) {
          _tagFormData[_obj[p]] = formData[p]
        }
      }
    }
    return _tagFormData
  }
  
  return {
    tagFormData,tagFormLink:_obj
  }
}

//根据FileId获取componentId
export function getComponentIdbyFileId (formItemList) {
  let _obj = {}
  _getCIdbyFId(formItemList)
  function _getCIdbyFId (formItemList,parentId = '') {
    formItemList.forEach(item=>{
      
      //布局类型组件
      if(item.configList.layout) {
        _obj[item.configList.layout.fileId || item.componentId] = { id:item.componentId,parentId:parentId }
        item.configList.layout.colContent.forEach(citem=>{
          //重复表需要插入父节点字段
          if(item.configList.layout.ifAdd) {
            let _pId =  item.configList.layout.fileId || item.componentId
            _getCIdbyFId(citem,_pId)
          }
          else{
            _getCIdbyFId(citem)
          }
        })
      }else{
        _obj[item.configList.fileId || item.componentId] = { id:item.componentId,parentId:parentId }
      }
    })
  }
  return _obj
}