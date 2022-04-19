<template>
  <a-tooltip
    position="bl"
    v-for="(item,index) in linkStore"
    :key="item.id"
    :content="`选择${item.value}`"
    :content-class="item.value.length <8 ?'tooltip-hide':''"
    :arrow-class="item.value.length <8 ?'tooltip-hide':''"
  >
    <a-form-item
      :label="`选择${item.value}`"
      :label-col-props="{xs:20,lg:4}"
      :wrapper-col-props="{span:20}"
      @click="formClick(item,index)"
    >
      <a-input :placeholder="`请选择`" v-model="item.formTitle" readonly/>
    </a-form-item>
  </a-tooltip>
  <a-modal
    v-model:visible="linkShow"
    @ok="handleOk"
    width="800px"
    @cancel="cancelModal"
  >
    <template #title>
      关联表单
    </template>
    <a-form
      class="search-form"
      :model="form"
      layout="inline"
    >
      <a-form-item label="申请类型" hideLabel>
        <a-select
          v-model="form.type"
          :style="{width:'150px'}"
          placeholder="申请类型"
          @change="typeChange"
        >
          <a-option v-for="item in applys" :key="item.key" :value="item.key">
            {{ item.value }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-form-item label="搜索类型" hideLabel>
        <a-select
          v-model="form.search"
          :style="{width:'150px'}"
          placeholder="请选择搜索类型"
          @change="searchChange"
        >
          <a-option v-for="item in searchs" :key="item.key" :value="item.key">
            {{ item.value }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-form-item v-if="form.search === 3" field="draftTime" hideLabel>
        <a-range-picker
          style="width: 300px;"
          v-model="form.draftTime"
          @change="conditionChange('draftTimeChange')"
        />
      </a-form-item>
      <a-form-item
        v-else
        label="搜索类型"
        hideLabel
      >
        <a-input
          v-model="form.find"
          :style="{ width: '300px' }"
          placeholder="搜索"
          allow-clear
          @clear="conditionChange('inputClear')"
          @input="conditionChange"
        />
      </a-form-item>
    </a-form>
    <a-table
      row-key="id"
      :columns="columns"
      :data="tableList"
      :loading="loading"
      :pagination="pagination"
      @pageChange="pageChange"
      @selectionChange="selectChange"
      :row-selection="rowSelection"
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
          <template
            v-if=" column.dataIndex === 'operate' || column.dataIndex === 'title' "
            #cell="{ record }"
          >
            <div v-if="column.dataIndex === 'title'">
              {{ record.title }}
            </div>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </a-modal>
</template>

<script>
import { reactive, toRefs,  } from 'vue'
import { useFormConfigStore } from '../../store'
import * as API from './api.js'
const applys = [{ key: 1, value:'本人发起' },{ key:2, value:'他人发起' }]
const searchs = [{ key: 1, value:'表单标题' },{ key:2, value:'发起人' },{ key:3, value:'申请时间' }]
const columns = [  
  { title: '表单类型', dataIndex: 'tplClassifyName',  width: 80, align: 'left', },
  { title: '表单标题', dataIndex: 'title', width: 180 ,align:'left' },
  { title: '发起人', dataIndex: 'applyUserName', width: 120, align: 'left' },
  { title: '申请时间', dataIndex: 'submitTime', width: 150, align: 'left' }]
export default {
  setup () { 
    const config = useFormConfigStore()
    const state = reactive({ linkStore: [], 
      linkShow: false,
      form: { type:1 , search:1, draftTime:[] },
      pagination: { current: 1, total: 0, },
      tableList:[],
      rowSelection: { type: 'radio',selectedRowKeys:[]  },
      chooseItem: { id:0 }
    })

    function formClick (item,index) {
      item.index = index
      state.chooseItem = item
      state.linkShow = true
      typeChange()
    }

    const selectChange = async (vals) => {
      state.rowSelection.selectedRowKeys = vals
      state.linkStore[state.chooseItem.index].res = await API.getFormItems(vals[0])
    }

    function cancelModal () {
      state.form = { type:1 , search:1, draftTime:[] }
      state.rowSelection.selectedRowKeys = []
    }

    function handleOk () {
      state.rowSelection.selectedRowKeys = []
      state.linkStore[state.chooseItem.index].formTitle = state.chooseItem.value
    }

    function typeChange () {
      state.pagination.current = 1
      getInitData({ state })
    }

    function searchChange () {
      state.form.find = ''
      state.form.draftTime = []
      state.pagination.current = 1
      getInitData({ state })
    }

    getInitData({ state })
    const pageInteractionFun = pageInteraction({ state })
    config.$onAction(({ store, })=>{
      setTimeout(() => {
        state.linkStore = store.relationSet.templates
      }, 0)
    })

    return {
      ...toRefs(state),
      applys,
      searchs,
      columns,
      handleOk,
      cancelModal,
      typeChange,
      searchChange,
      selectChange,
      formClick,
      ...pageInteractionFun,
    }
  },
  mounted () {
  },
  methods:{

  },
}
//初始化表格数据
function getInitData ({ state }) {
  const params = {
    title: state.form.search === 1 ? state.form.find : '',
    applyUserName: state.form.search === 2 ? state.form.find : '',
    startTime: state.form.draftTime[0] ? state.form.draftTime[0] + ' 00:00:00' : '',
    endTime: state.form.draftTime[1] ? state.form.draftTime[1] + ' 23:59:59' : '',
    page: state.pagination.current,
    type: state.form.type,
    procTplConfigIdList:[state.chooseItem.id]
  }
  state.loading = true
  // eslint-disable-next-line consistent-return
  API.pageList(params).then((res)=> {
    state.tableList = res.content
    state.pagination.total = res.totalElements
  }).finally(()=>{
    state.loading = false
  })
}
//页面消费函数
function pageInteraction ({ state }) {
  //条件变更需刷新表格数据
  const conditionChange = (str) => {
    if(str === 'draftTimeChange') {
      if(!state.form.draftTime) {
        state.form.draftTime = []
      }
    }
    if(str === 'inputClear') {
      state.form.find = ''
    }
    state.pagination.current = 1
    getInitData({ state })
  }
  //分页改变时
  const pageChange = (page) => {
    console.log('page: ', page)
    state.pagination.current = page
    getInitData({ state })
  }

  //搜索防抖
  return {
    conditionChange,
    pageChange,
  }
}
</script>

<style lang="less" scoped>
@import url('../../style/obg2form.less');

</style>