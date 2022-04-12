<template>
  <a-modal
    v-model:visible="linkShow"
    @ok="handleOk"
    title-align="start"
    width="800px"
  >
    <template #title>
      关联模板设置
    </template>
    <div>
      <div class="model-title">
        选择关联模板
      </div>
      <a-select :style="{width:'750px'}" placeholder="请选择" multiple>
        <a-option>
          Beijing
        </a-option>
        <a-option>
          Shanghai
        </a-option>
        <a-option>
          Guangzhou
        </a-option>
      </a-select>
    </div>
    <div style="margin-top: 20px;">
      <div class="model-title">
        设置组件
      </div>
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
            :align="column.align ? column.align : 'left'"
          >
            <template #cell="{ record,rowIndex }">
              {{ record }}
              <div v-if="column.dataIndex === 'orgComponent'">
                {{ record.orgComponent }}
              </div>
              <div v-if="column.dataIndex === 'relationType'">
                <a-select
                  v-model="record.relationType"
                  :style="{width:'200px'}"
                  placeholder="请选择"
                  @change="typeChange($event,rowIndex)"
                >
                  <a-option :value="0">
                    本表
                  </a-option>
                  <a-option :value="1">
                    表单1
                  </a-option>
                  <a-option :value="2">
                    表单2
                  </a-option>
                </a-select>
              </div>
              <template/>
            </template>
          </a-table-column>
        </template>
      </a-table>
      {{ data }}
    </div>
  </a-modal>
</template>
<script lang="ts">
// import{ post } from '@/tools/request'
import { reactive, toRefs, watch } from 'vue-demi'
import { useFormConfigStore } from '../../../../store'
import { getTree,trsfromData } from '../../../../utils'
// import { Components } from './interface'
// import _ from 'lodash'
// import { Message } from '@arco-design/web-vue'
export default {
  emits:['update:linkShow'],
  props:{
    linkShow:{ type:Boolean, default:()=>false },
  },
  setup (props,{ emit }) {
    const state = reactive({
      inforBaseList:[],
      informationBase:'',
      type:'0',
      loading:false,
      columns : [
        { title: '原组件', dataIndex: 'orgComponent', },
        { title: '关联类型', dataIndex: 'relationType', },
        { title: '关联模板', dataIndex: 'relationTem', },
        { title: '关联组件', dataIndex: 'relationCompo', },
        { title: '关联函数', dataIndex: 'relationFunc', },
      ],
      data:[]
    //   data:Array as Array<components[]>:[],
    })
    // const tabData = ref<Components[]>([])
    const formConfig  = useFormConfigStore()
    setTimeout(() => {
      state.data = getTree(formConfig.formItemList,true)
      state.data =  trsfromData(state.data,'children').map((item)=>{
        return { orgComponent:item.title,orgComponentId:item.key , relationType: 0 } 
      })
      //   treeData.reduce((result, item) => {
      //     result.push(item)
      //     if (item['chidlren']) {
      //       result = result.concat(flat(item[chidlren]))
      //     }
      //     return result
      //   }, [])
      console.log('treeData: ', state.data)
    }, 1000)

    function getOrgData () {
      state.data = getTree(formConfig.formItemList,true)
      state.data =  trsfromData(state.data,'children').map((item)=>{
        return { orgComponent:item.title,orgComponentId:item.key } 
      })
    }

    function typeChange (val,index) {
      state.data[index].relationType = val
      console.log('name,index: ', val,index)
    //   post('/oa-platform/infoMeta/selectList',{ name }).then(res=>{
    //     state.inforBaseList = res || []
    //   })
    }

    // eslint-disable-next-line consistent-return
    function handleOk () {
    }

    watch(()=>props.linkShow,(val)=>{
      emit('update:linkShow', val)
      val && getOrgData()
    })
    return{
      ...toRefs(state),
      //   tabData,
      handleOk,
      formConfig,
      typeChange,
    }
  },
}
</script>
<style lang="less" scoped>
.model-title {
  margin-bottom: 10px;
  font-weight: bold;
}
</style>