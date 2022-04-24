<template>
  <a-modal
    :visible="true"
    @ok="submit"
    @cancel="cancel"
    width="900px"
  >
    <template #title>
      流程设置
    </template>
    <div class="nx-form-setting-modal">
      <div style="margin-bottom: 10px;">
        <a-button type="primary" @click="addPathSetting">
          新建流程
        </a-button>
      </div>
      <div class="nx-form-setting-modal-item" v-for="(item,index) in pathList" :key="item.key">
        <a-space>
          <a-tree-select
            placeholder="请选择字段"
            :style="{width:'200px'}"
            :data="treeDataNotRoot"
            v-model="item.parentProp"
          />
          值
          <a-select placeholder="表达式" :style="{width:'100px'}" v-model="item.equation">
            <a-option v-for="ops in equations" :key="ops.value" :value="ops.value">
              {{ ops.label }}
            </a-option>
          </a-select>
          <a-input
            placeholder="请填写值"
            allow-clear
            v-model="item.value"
            :style="{width:'150px'}"
          />
          时
          <a-tree-select
            placeholder="请选择字段"
            :style="{width:'150px'}"
            :data="treeData"
            v-model="item.childProp"
          />
          <a-select placeholder="请选择行为" :style="{width:'150px'}" v-model="item.action">
            <a-option v-for="ops in actions" :key="ops.value" :value="ops.value">
              {{ ops.label }}
            </a-option>
          </a-select>
          <icon-delete class="delIcon" @click="delPathSetting(index)"/>
        </a-space>
        <a-typography-text type="danger" v-if="noDataList.includes(index)">
          请填写完整
        </a-typography-text>
      </div>
    </div>
  </a-modal>
</template>
<script>
import { reactive, ref } from 'vue'
import { getTree } from '../../../../../utils'
import { useFormConfigStore } from '../../../../../store'
import _ from 'lodash'
// import { watch } from '@vue/runtime-core'
const equations = [{ value:'equal', label:'等于' },{ value:'noEqual', label:'不等于' }]
const actions = [{ value:'disabled', label:'禁用' },{ value:'hide', label:'隐藏' },{ value:'required', label:'必选' }]
export default {
  emits:['close'],
  setup (prop,{ emit }) {
    const formConfig  = useFormConfigStore()
    const treeDataNotRoot = getTree(formConfig.formItemList,true)
    const treeData = getTree(formConfig.formItemList,false)
    let visible = ref(false)
    let pathList = reactive(_.cloneDeep(formConfig.pathSet))
    let noDataList = reactive([])
    function submit () {
      let canSubmit = true
      pathList.forEach((item,index)=>{
        for(let p in item) {
          if(!item[p]) {
            canSubmit = false
            noDataList.push(index)
            return
          }
        }
      })
      if(canSubmit) {
        formConfig.pathSet = _.cloneDeep(pathList)
        emit('close',false)
      }
    }
    function cancel () {
      emit('close',false)
    }
    function addPathSetting () {
      let pathObj = {
        key:Math.random(),
        parentProp:'',
        equation:null,
        value:null,
        childProp:'',
        action:null
      }
      pathList.push(pathObj)
    }
    function delPathSetting (index) {
      pathList.splice(index,1)
    }
    return {
      visible,
      submit,
      cancel,
      pathList,
      addPathSetting,
      delPathSetting,
      treeDataNotRoot,
      treeData,
      noDataList,
      equations,
      actions,
    }
  },
  methods: {
   
  }
}
</script>