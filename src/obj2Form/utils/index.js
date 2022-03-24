/**
 * 根据组件列表获取form结构
 * @param {*} formItemList 组件列表
 * @param {Object} options options对象
 * @returns 
 */
// import { toRaw } from '@vue/reactivity'
import { post } from './request'
export function getForm (formItemList,options) {
//   console.log('formItemList: ', formItemList)
  let form = {}
  let componentId2fileId = {}
  formItemList.forEach(item=>{
    let configList = item.configList
    item.hideLabel = configList.layout ? configList.layout.hideLabel : configList.hideLabel
    if(['NxSelect','NxCheckbox'].includes(item.type)) {
      if(configList.remote) {
        let fnc = ()=> post(configList.remoteUrl) 
        options[configList.fileId] = {
          fnc,
          remotePath: configList.remotePath,
          value: configList.keys.value,
          key: configList.keys.key
        }
      } else {
        options[configList.fileId] = configList.columns
      }
    }
    //布局组件
    if(configList.layout) {
      let obj = {}
      //存放id映射关系
      let componentId2fileIdObj = {}
      //遍历布局组件子节点
      configList.layout.colContent.forEach((citem)=>{
        //循环迭代，获取子节点form结构
        let res = getForm(citem,options)
        Object.assign(obj,res.form)
        Object.assign(componentId2fileIdObj,res.componentId2fileId)
      })
      if(configList.layout.ifAdd) {
        form[configList.layout.fileId] = [obj]
        componentId2fileId[item.componentId] = configList.layout.fileId
      }else{
        Object.assign(form,obj)
        Object.assign(componentId2fileId,componentId2fileIdObj)
      }
    }else{
      if(configList.multiple) {
        form[configList.fileId] = []
      }else{
        form[configList.fileId] = configList.defaultVal
      }
    }
    componentId2fileId[item.componentId] = configList.fileId || item.componentId
  })
  return { form,options,componentId2fileId }
}


//采用递归读取对象的属性值
export function getField (data,fields) {
  let arr = fields.split('.')
  let key = arr.shift()
  let value = data[key]
 
  if(value === null) {
    return value
  } else if(arr.length === 0) {
    return value
  }
 
  let result = getField(value,arr.join('.'))
  return result
}


//根据信息库映射和提交数据获取传入信息库数据
export function getFormData (tagData,mapList,formItemList) {
  let _mapList = mapList.moduleList.filter(item=>item.fileId)
  let CidToFid = getComponentIdbyFileId(formItemList)
  let _obj = {}
  //遍历生成tagId-field的对应关系
  for(let p in CidToFid) {
    _mapList.forEach(citem=>{
      if(CidToFid[p].id === citem.fileId) {
        _obj[citem.tagId] = p
        if(citem.tagTableId) {
          _obj[citem.tagTableId] = CidToFid[p].parentId
        }
      }
    })
  }
  //遍历formData，获取fieldId data
  let fileFormData = _getTagForm(tagData)
  function _getTagForm (tagData) {
    let _fileFormData = {}
    for(let p in tagData) {
      if(Array.isArray(tagData[p])) {
        _fileFormData[_obj[p]] = []
        tagData[p].forEach(citem=>{
          let res = _getTagForm(citem)
          _fileFormData[_obj[p]].push(res)
        })
      }else{
        if(_obj[p]) {
          _fileFormData[_obj[p]] = tagData[p]
        }
      }
    }
    return _fileFormData
  }
  return {
    fileFormData
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