<template>
  <div>
    <ItemOaInfoTable
      :columns="[...columns, ...[{
        title: '操作',
        dataIndex: 'operate',
        width: 110
      }]]"
      :data="data"
      @btnClick="btnClick"
    />

    <a-modal v-model:visible="linkShow" @ok="handleOk" width="800px">
      <template #title>
        选择信息库数据
      </template>
      <a-form-item
        label="搜索类型"
        hideLabel
      >
        <a-input
          v-model="form.find"
          :style="{ width: '300px' }"
          placeholder="输入供应商名称"
          allow-clear
          @clear="conditionChange('inputClear')"
          @input="inputDebounce"
        />
      </a-form-item>
      <ItemOaInfoTable
        :columns="columns"
        :data="tableList"
        :loading="loading"
        :pagination="pagination"
        @pageChange="pageChange"
        @selectionChange="selectChange"
        :row-selection="rowSelection"
      />
    </a-modal>
  </div>
</template>

<script>
import { reactive, toRefs, } from 'vue'
import { post } from '../utils/request'
import _ from 'lodash'
import ItemOaInfoTable from './itemOaInfoTable.vue'
export default {
  components:{ ItemOaInfoTable },
  props:{
    item:{ type:Object,default :()=>{}  },
    formData:{ type:Object,default :()=>{}  },
    proxyOptions:{ type:Object,default :()=>{} },
    pathSetObj:{ type:Object ,default :()=>{} },
    ifRequired:{ type:Boolean, default:()=>false },
    ifDisabled:{ type:Boolean, default:()=>false },
    id:{ type: null, }
  },
  //   emits:['changeData'],
  setup (props) { 
    const state = reactive({ 
      columns: [],
      linkShow: false,
      loading: true,
      form: { type:1 , search:1 },
      pagination: { current: 1, total: 0, },
      tableList:[],
      rowSelection: { type: 'radio' },
      chooseItem: {},
      data: [{}]
    })

    function setColumns () {
      setTimeout(() => {
        state.columns = _.map(props.item.configList.oaChooseDataitem,(item)=>{ return { title:item, dataIndex:item } })
        console.log('state.columns: ', state.columns)
      }, 0)
    }

    function handleOk () {
      if(JSON.stringify(state.data[0]) === '{}') {
        state.data[0] = state.chooseItem
        return
      }
      state.data.push(state.chooseItem)
    }

    function btnClick (val,index) {
      if(val === 'add') {
        state.linkShow = true
      }else {
        state.data.splice(index,1)
      }
    }
    // getInitData({ state })
    const { getInitData, ...pageInteractionFun } = pageInteraction({ props,state })

    setColumns()
    getInitData()
    return {
      ...toRefs(state),
      setColumns,
      getInitData,
      handleOk,
      btnClick,
      ...pageInteractionFun
    }
  },
}
//页面消费函数
function pageInteraction ({ props, state }) {
  const getInitData = ()=>{
    console.log(123)
    state.loading = true
    post(`${process.env.VUE_APP_BASE_URL}/oa-platform/infoMeta/dataList`, {
      infoMetaId:1,
      colShowList: _.map(props.item.configList.oaChooseDataitem,(item)=>{ return { colName:item } }) 
    }).then((res)=> {
      state.loading = false
      if(res.code !== 200) return state.tableList = []
      state.tableList = res.data.content
      return state.pagination.total = res.data.totalElements
      
    })
  }
  //条件变更需刷新表格数据
  const conditionChange = (str) => {
    if(str === 'draftTimeChange') {
      if(!state.form.draftTime) {
        state.form.draftTime = []
      }
    }
    if(str === 'inputClear') {
      state.form.draftName = ''
    }
    state.pagination.current = 1
    getInitData({ state })
  }
  //分页改变时
  const pageChange = (page) => {
    state.pagination.current = page
    getInitData({ state })
  }
  //搜索防抖
  const inputDebounce = _.debounce(() => conditionChange(), 300)

  const selectChange = (vals) => {
    console.log('vals: ', vals)
    state.chooseItem = _.find(state.tableList, ['联系人',vals[0]])
    console.log('state.chooseItem: ', state.chooseItem)
    // state.chooseItem.link = `/myApply/applyForm?type=apply&preId=${vals[0]}`
  }
  return {
    getInitData,
    conditionChange,
    pageChange,
    inputDebounce,
    selectChange,
  }
}
</script>

<style lang="less" scoped>
.cell-item {
  margin: 0 -16px;
  padding: 0 10px 0;

  &:nth-child(2n-1) {
    margin-bottom: 4px;
    border-bottom: 1px solid var(--color-neutral-3);
    padding-bottom: 4px;
  }

  &:nth-last-child(2n) {
    margin-bottom: -2px;
    border: none;
  }
}
</style>