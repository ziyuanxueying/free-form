<template>
  <a-modal
    :visible="true"
    @ok="modalAct"
    @cancel="modalAct"
    width="auto"
  >
    <template #title>
      流程设置
    </template>
    <div class="nx-form-setting-modal">
      <div style="marginBottom:10px">
        <a-button type="primary" @click="addPathSetting">
          新建流程
        </a-button>
      </div>
      <div class="nx-form-setting-modal-item" v-for="(item,index) in pathList" :key="item">
        <a-space>
          <a-tree-select
            placeholder="请选择字段"
            :style="{width:'200px'}"
            :data="treeData"
            :tree-checked-strategy="all"
          />
          值
          <a-select placeholder="请选择表达式" :style="{width:'200px'}">
            <a-option value="equal" label="等于"/>
            <a-option value="noEqual" label="不等于"/>
          </a-select>
          <a-input
            placeholder="请填写值"
            allow-clear
            :style="{width:'200px'}"
          />
          时
          <a-tree-select
            placeholder="请选择字段"
            :style="{width:'200px'}"
            :data="treeData"
            :tree-checked-strategy="all"
          />
          <a-select placeholder="请选择行为" :style="{width:'200px'}">
            <a-option value="disabled" label="禁用"/>
            <a-option value="none" label="隐藏"/>
            <a-option value="required" label="必选"/>
          </a-select>
          <icon-delete class="delIcon" @click="delPathSetting(index)"/>
        </a-space>
      </div>
    </div>
  </a-modal>
</template>
<script>
import { reactive, ref } from '@vue/reactivity'
import { getTree } from '@utils'
import { useFormConfigStore } from '@store'
// import { watch } from '@vue/runtime-core'
export default {
  emits:['close'],
  setup (prop,{ emit }) {
    const formConfig  = useFormConfigStore()
    const treeData = getTree(formConfig.formItemList)
    let visible = ref(false)
    let pathList = reactive([1])
    function modalAct () {
      emit('close',false)
    }
    function addPathSetting () {
      let a = Math.random()
      pathList.push(a)
    }
    function delPathSetting (index) {
      pathList.splice(index,1)
    }
    return {
      visible,
      modalAct,
      pathList,
      addPathSetting,
      delPathSetting,
      treeData
    }
  },
  methods: {
   
  }
}
</script>