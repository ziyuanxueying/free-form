<template>
  <a-modal
    :visible="true"
    @ok="handleOk"
    @cancel="handleCancel"
    title-align="start"
    width="800px"
  >
    <template #title>
      设置读写信息库
    </template>
    <div>
      <div class="form-item">
        <span class="form-label">
          设置读写类型
        </span>
        <a-radio-group v-model="type">
          <a-radio value="A">
            新增
          </a-radio>
          <a-radio value="B">
            更新
          </a-radio>
          <a-radio value="C">
            停用
          </a-radio>
        </a-radio-group>
      </div>
      <div class="form-item">
        <div class="form-label">
          选择关联信息库
        </div>
        <a-select
          placeholder="请选择关联信息库"
          @change="changeInforBase"
          allow-search
          @input-value-change="getInforBase"
          v-model="informationBase"
        >
          <a-option v-for="(item,index) in inforBaseList" :key="index" :value="item.id">
            {{ item.name }}
          </a-option>
        </a-select>
      </div>
      <div class="form-item">
        <div class="form-label">
          设置组件
        </div>
        <a-table :data="data" row-key="id" :loading="loading">
          <template #columns>
            <a-table-column title="信息库列表项" data-index="moduleName"/>
            <a-table-column title="模板标签" data-index="fileId">
              <template #cell="{record }">
                <a-tree-select
                  placeholder="请选择字段"
                  :data="treeData"
                  v-model="data[record.id].fileId"
                  allow-clear
                />
                <span style="color:red;font-size:12px" v-if="formConfig.delList.includes(data[record.id].fileId)">
                  节点已经被删除，请重新选择
                </span>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </div>
    </div>
  </a-modal>
</template>
<script>
import{ post } from '@/tools/request'
import { reactive, toRefs } from 'vue-demi'
import { getTree,ifExist } from '../../../../utils'
import { useFormConfigStore } from '../../../../store'
import { Message } from '@arco-design/web-vue'
export default {
  emits:['closeInforBase'],
  setup (props,{ emit }) {
    const state = reactive({
      data:[],
      inforBaseList:[],
      informationBase:'',
      type:'',
      loading:false
    })
    ifExist()
    const formConfig  = useFormConfigStore()
    
    const treeData = getTree(formConfig.formItemList,true)
    function getInforBase (name) {
      post('/oa-platform/infoMeta/selectList',{ name }).then(res=>{
        state.inforBaseList = res || []
      })
    }
    function handleCancel () {
      emit('closeInforBase')
    }
    function handleOk () {
      let moduleList = state.data.filter(item=>{
        return item.fileId
      })
      //判断是否重复绑定
      let fileIdList = moduleList.map(item=>item.fileId)
      let set = Array.from(new Set(fileIdList))
      if(fileIdList.length !== set.length) {
        Message.warning('禁止重复绑定')
        return 
      }else{
        if(state.data.length > 0 && !state.type) {
          Message.warning('请设置读写类型')
          return
        }
        formConfig.setModuleList(state.data)
        formConfig.setInformationBase(state.informationBase,state.type)
        handleCancel()
      }
    }
    function changeInforBase (val) {
      if(!val) {
        return 
      }
      state.loading = true
      post(`/oa-platform/infoMeta/columnList/${val}`).then(res=>{
        let data = res || []
        state.data = data.map((item,index)=>{
          return {
            tagId:item.colName,
            moduleName:item.colName,
            tagTableId:item.tableName,
            fileId:'',
            rule:item.validRule,
            uiType:item.uiType ,
            id:index,
          }
        })
      }).finally(()=>{
        state.loading = false
      })
    }
    function init () {
      getInforBase()
      console.log(formConfig.moduleList)
      state.data = formConfig.moduleList
      state.informationBase = formConfig.informationBase
      state.type = formConfig.type
    }
    init()
    return{
      getInforBase,
      ...toRefs(state),
      handleCancel,
      handleOk,
      treeData,
      changeInforBase,
      formConfig
    }
  },
}
</script>
<style lang="less" scoped>
.form-item{
    margin-bottom:20px;
    .form-label{
        margin-bottom: 5px;
        margin-right: 10px;
    }
}
</style>