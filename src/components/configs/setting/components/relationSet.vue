<template>
  <a-modal
    v-model:visible="linkModel"
    @ok="handleOk"
    @cancel="handleCancel"
    title-align="start"
    width="800px"
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
          :label="item.name"
        />
      </a-select>
    </div>
    <div style="margin-top: 20px;">
      <a-table
        :columns="columns"
        :data="data"
        :bordered="{wrapper: true, cell: true}"
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
              <!-- 关联模板 -->
              <div v-if="column.dataIndex === 'relationTem'">
                <a-select
                  v-model="record.relationTem"
                  :style="{width:'150px',height:'44px'}"
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
                    :label="item.name"
                  />
                </a-select>
              </div>
              <!-- 关联组件 -->
              <div v-if="column.dataIndex === 'relationCompo'">
                <a-select
                  v-model="record.relationCompo"
                  :style="{width:'150px'}"
                  placeholder="请选择"
                  @change="typeChange($event,rowIndex,'relationCompo')"
                  :bordered="false"
                  allow-clear
                >
                  <!-- :bordered="false" -->
                  <a-option
                    v-for="item in record.relationCompos"
                    :key="item.fileId"
                    :value="item.fileId"
                    :label="item.name"
                  />
                </a-select>
              </div>
              <!-- 关联类型 -->
              <div v-if="column.dataIndex === 'relationType'">
                <a-select
                  v-model="data[rowIndex].relationType"
                  :disabled="!record.relationCompo||Boolean(record.relationFunc)"
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

              <!-- 关联函数 -->
              <div v-if="column.dataIndex === 'relationFunc'">
                <a-input
                  v-model="data[rowIndex].relationFunc"
                  :disabled="!record.relationCompo||Boolean(record.relationType)"
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
import { getTree,trsfromData } from '../../../../utils'
import { post } from '@/tools/request'
// import { Components } from './interface'
import _ from 'lodash'
// import { Message } from '@arco-design/web-vue'
export default defineComponent({
  props:{
    linkShow:{ type:Boolean, default:()=>false },
  },
  emits:['update:linkShow'],
  setup (props,{ emit }) {
    const state = reactive({
      temList:[],
      temNames: { value: 'id', label: 'name' },
      temChooseList:[],
      loading:true,
      linkModel:true,
      columns : [
        { title: '原组件', dataIndex: 'orgComponent',width:140 },
        { title: '关联模板', dataIndex: 'relationTem',width:160 },
        { title: '关联组件', dataIndex: 'relationCompo',width:150  },
        { title: '关联类型', dataIndex: 'relationType',width:100 },
        { title: '关联函数', dataIndex: 'relationFunc',width:200 },
      ],
      data:[],
      curCompos:[],
    //   data:Array as Array<components[]>:[],
    })
    // const tabData = ref<Components[]>([])
    const formConfig  = useFormConfigStore()

    async function temInit () {
      state.temList = await post('/oa-platform/procTplConfig/selectListFlat') 
      state.temList = _.map(state.temList,(item)=>{ return { ...item ,value:item.name } })
    }
    async function getOrgData () {
      state.data = getTree(formConfig.formItemList,true)
      state.data = trsfromData(state.data,'children').map((item)=>{
        return { orgComponent:item.title,orgComponentId:item.key } 
      })
      //   formConfig.formItemList
      let list = _.filter(formConfig.relationTem.components, (item)=> { return item.relationTem || item.relationTem === 0 })
      list.forEach(item => {
        console.log('item: ', item.orgComponentId)
        let index = _.findIndex(state.data,['orgComponentId',item.orgComponentId])
        
        index !== undefined && (state.data[index] = item)
      })
      console.log('formConfig: ', state.data, list)
      //   console.log('list: ', _.merge(state.data, list))
      state.curCompos = state.data.map((item)=>{
        return { name:item.orgComponent, fileId:item.orgComponentId , procTplConfigId:0 } 
      })
    }

    async function typeChange (val,index,param) {
      state.data[index][param] = val
      console.log('name,index: ', val,index)
      if(param === 'relationTem') {
        state.data[index].relationCompos = val === 0 ? state.curCompos : await post('/oa-platform/procTplConfig/componentList' ,{ procTplConfigIdList:[val] }) 
        state.data[index].relationCompo = ''
        state.data[index].relationType = ''
        state.data[index].relationFunc = ''
      }
      if(param === 'relationCompo') {
        state.data[index].relationType = val ? '0' : ''
      }
      console.log(' state.data: ', state.data)
    }

    function handleOk () {
      console.log('state.data: ', state.data)
      formConfig.setRelationTem(state.temChooseList,state.data)
      handleCancel()
    }
    function handleCancel () {
      state.linkModel = false
      emit('update:linkShow', false)
    }
    setTimeout(() => {
      getOrgData()
      console.log(123)
    }, 1000)
    temInit()
    watch(()=>props.linkShow,(val)=>{
      console.log('val: ', val)
      val && getOrgData()
      state.linkModel = val
      emit('update:linkShow', val)
    })
    // },{ immediate:true })

    return{
      ...toRefs(state),
      //   tabData,
      handleOk,
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

.org-view {
  //   margin: px 0;
  //   width: 142px;
  height: 44px;
  background-color: var(--color-neutral-2);
}
</style>