<template>
  <a-modal
    v-model:visible="linkModel"
    :onBeforeOk="onBeforeOk"
    @cancel="handleCancel"
    title-align="start"
    width="1000px"
  >
    <template #title>
      关联模板设置
    </template>
    <div>
      <span class="model-title">
        关联模板：
      </span>
      <a-select
        v-model="temChooseList"
        :style="{width:'480px'}"
        placeholder="请选择"
        :max-tag-count="2"
        multiple
      >
        <a-option
          v-for="item in temList"
          :key="item.id"
          :value="item"
          :label="item.value"
        />
      </a-select>
    </div>
    <div style="margin-top: 20px;">
      <a-table
        :columns="columns"
        :data="data"
        :bordered="{wrapper: true, cell: true}"
        :loading="tabLoading"
        :pagination="false"
      >
        <template #columns>
          <a-table-column
            v-for="(column, index) in columns"
            :key="index"
            :title="column.title"
            :data-index="column.dataIndex"
            :width="column.width"
            :fixed="column.fixed"
            :align="column.align ? column.align : 'center'"
          >
            <template #cell="{ record,rowIndex }">
              <div v-if="column.dataIndex === 'orgComponent'" class="org-view">
                <span class="flex-column" style="justify-content: center; height: 50px;">
                  {{ record.orgComponent }}
                </span>
              </div>
              <!-- 关联类型 -->
              <div v-if="column.dataIndex === 'relationType'">
                <a-select
                  v-model="data[rowIndex].relationType"
                  :style="{width:'100px'}"
                  placeholder="请选择"
                  @change="typeChange($event,rowIndex,'relationType')"
                  allow-clear
                  :bordered="false"
                >
                  <a-option value="0">
                    相等
                  </a-option>
                  <a-option value="1">
                    统计
                  </a-option>
                </a-select>
              </div>
              <!-- 关联模板 -->
              <div v-if="column.dataIndex === 'relationTem'">
                <a-select
                  v-model="record.relationTem"
                  :style="{width:'270px',height:'44px'}"
                  placeholder="请选择"
                  @change="typeChange($event,rowIndex,'relationTem')"
                  allow-clear
                  :bordered="false"
                >
                  <a-option :value="0">
                    本表
                  </a-option>
                  <a-option
                    v-for="item in temChooseList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.value"
                  />
                </a-select>
              </div>
              <!-- 关联组件 -->
              <div v-if="column.dataIndex === 'relationCompo'">
                <a-select
                  v-model="record.relationCompo"
                  :style="{width:'230px'}"
                  placeholder="请选择"
                  :disabled="Boolean(record.relationFunc)"
                  @change="typeChange($event,rowIndex,'relationCompo')"
                  :bordered="false"
                  allow-clear
                >
                  <a-option
                    v-for="item in record.relationCompos"
                    :key="item.fileId"
                    :value="item.fileId"
                    :label="item.name"
                  />
                </a-select>
              </div>

              <!-- 关联函数 -->
              <div v-if="column.dataIndex === 'relationFunc'">
                <a-input
                  v-model="data[rowIndex].relationFunc"
                  :disabled="Boolean(record.relationCompo)||record.relationType==='1'"
                  :style="{width:'190px'}"
                  placeholder="请输入"
                  allow-clear
                />
              </div>
              <template/>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>
  </a-modal>
</template>
<script>
// <script lang="ts">
import { reactive, toRefs, watch,defineComponent } from 'vue-demi'
import { useFormConfigStore } from '../../../../store'
import { getLinkTree,checkRelationSet } from '../../../../utils'
// import { Components } from './interface'
import _ from 'lodash'
import { Message } from '@arco-design/web-vue'
import * as API from './api'
import { useRoute } from 'vue-router'
export default defineComponent({
  props:{
    linkShow:{ type:Boolean, default:()=>false },
  },
  emits:['update:linkShow'],
  setup (props,{ emit }) {
    const route = useRoute()
    const state = reactive({
      temList:[],
      temNames: { value: 'id', label: 'name' },
      temChooseList:[],
      loading:true,
      linkModel:false,
      columns : [
        { title: '原组件', dataIndex: 'orgComponent',width:140 },
        { title: '关联类型', dataIndex: 'relationType',width:100 },
        { title: '关联模板', dataIndex: 'relationTem',width:250 },
        { title: '关联组件', dataIndex: 'relationCompo',width:230  },
        { title: '关联函数', dataIndex: 'relationFunc',width:200 },
      ],
      data:[],
      curCompos:[],
      typeDisables:[],
      funcDisables:[],
      tabLoading: false
    //   data:Array as Array<components[]>:[],
    })
    // const tabData = ref<Components[]>([])
    const formConfig  = useFormConfigStore()

    async function temInit () {
      state.temList = _.remove(await API.selectListFlat(),  (n)=> {
        return n.id !== Number(route.query.temId) 
      })
      state.temChooseList = formConfig.relationSet.templates
    }

    async function getOrgData () {
      state.data = getLinkTree(formConfig.formItemList)
      state.curCompos = state.data.map((item)=>{
        return { name:item.orgComponent, fileId:item.orgComponentId, nodePath:item.nodePathArray,procTplConfigId:0 } 
      })
      if(!formConfig.relationSet.components.length) { return }
      let count = 0 
      state.tabLoading = true
      formConfig.relationSet.components.forEach(async (item)=> {
        let index = _.findIndex(state.data,['orgComponentId',item.orgComponentId])
        if(index !== undefined && state.data[index]) {
          item.orgComponent = state.data[index].orgComponent
          item.orgComponentId = state.data[index].orgComponentId
          item.relationCompos = item.relationTem === 0 ? state.curCompos : await API.componentList(item.relationTem)
          state.data[index] = item
        }
        count++
        if(count === formConfig.relationSet.components.length) {
          state.tabLoading = false
        }
      })
    }

    async function typeChange (val,index,param) {
      state.data[index][param] = val === '' ? undefined : val
      console.log('state.data: ', state.data)
      if(param === 'relationTem') {
        state.data[index].relationCompos = val === 0 ? state.curCompos : await API.componentList(val)
        state.data[index].relationCompo = ''
        state.data[index].relationFunc = ''
      }
      if(param === 'relationCompo') {
        state.data[index].relationFunc = ''
      }
      if(param === 'relationType' && val === '1') {
        state.data[index].relationFunc = ''
      }
    }

    function onBeforeOk (done) {
      let { funcFalse,res } = checkRelationSet(state.data,state.curCompos)
      if(funcFalse) {
        Message.error('存在信息未匹配，请重新填写')
        done(false)
      } else {
        formConfig.setRelationSet(state.temChooseList,res,state.curCompos)
        handleCancel()
        done()
      }
    }

    function handleCancel () {
      state.linkModel = false
      emit('update:linkShow', false)
    }

    setTimeout(() => {
      temInit()
    }, 100)
    watch(()=>props.linkShow,(val)=>{
      val && getOrgData()
      state.linkModel = val
      emit('update:linkShow', val)
    })
    // },{ immediate:true })
    return{
      ...toRefs(state),
      //   tabData,
      onBeforeOk,
      handleCancel,
      formConfig,
      typeChange,
    }
  },
})
</script>
<style lang="less" scoped>
.model-title {
  margin-bottom: 10px;
  font-weight: bold;
}

:deep(.arco-table-td .arco-table-cell) {
  padding: 0 0;

  .arco-select-view-input,
  .arco-select-view-value {
    position: relative;
    left: 4px;
    display: block;
    text-align: center;
  }

  .arco-select-view-value-hidden {
    display: none;
  }

  .arco-select-view-single {
    padding: 0 8px;
  }

  .arco-select-view-suffix {
    padding-left: 0;
  }

  .arco-input-wrapper {
    border: none;
    padding: 0;
    background-color: transparent;
  }

  .arco-input-size-medium {
    text-align: center;
  }
}

:deep(.arco-select-option-content) {
  padding: 6px 2px;
  white-space: normal;
  line-height: 20px;
}

:deep(.arco-select-view-value) {
  white-space: normal;
  line-height: 16px !important;
}

.org-view {
  height: 44px;
  background-color: var(--color-neutral-2);
}
</style>