<template>
  <div>
    <a-button v-if="!ifDisabled" @click="linkShow=true">
      选择关联表单
    </a-button>
    <a
      class="link"
      v-if="chooseItem.title"
      :href="chooseItem?.link"
      target="_blank"
    >
      <icon-link/>
      {{ chooseItem.title }}
    </a>
    <span v-else>
      暂未选择关联表单
    </span>
    <a-modal v-model:visible="linkShow" @ok="handleOk" width="800px">
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
            @input="inputDebounce"
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
                <a-trigger class="demo-basic">
                  <span>
                    {{ record.title }}
                  </span>
                  <template v-if="record.title.length > 12" #content>
                    <div class="white-tip">
                      {{ record.title }}
                    </div>
                  </template>
                </a-trigger>
              </div>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script>
import { reactive, toRefs,watch, } from 'vue'
import { post } from '../utils/request'
import _ from 'lodash'
const applys = [{ key: 1, value:'本人申请' },{ key:2, value:'他人申请' }]
const searchs = [{ key: 1, value:'表单标题' },{ key:2, value:'申请人' },{ key:3, value:'申请时间' }]
const columns = [  
  { title: '表单类型', dataIndex: 'tplClassifyName',  width: 80, align: 'left', },
  { title: '表单标题', dataIndex: 'title', width: 180 ,align:'left' },
  { title: '申请人', dataIndex: 'applyUserName', width: 120, align: 'left' },
  { title: '申请时间', dataIndex: 'submitTime', width: 150, align: 'left' }]
export default {
  props:{
    data:{ type: null  },
    ifDisabled:{ type:Boolean, default:()=>false },
  },
  emits:['changeData'],
  setup (props,{ emit }) { 
    const state = reactive({
      linkShow: false,
      form: { type:1 , search:1, draftTime:[] },
      pagination: { current: 1, total: 0, },
      tableList:[],
      rowSelection: { type: 'radio' },
      chooseItem: {}
    })

    const selectChange = (vals) => {
      state.chooseItem = _.find(state.tableList, ['id',vals[0]])
      state.chooseItem.link = `/myApply/applyForm?type=apply&preId=${vals[0]}`
    }

    function handleOk () {
      emit('changeData', state.chooseItem)
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

    watch(()=>props.data,()=>{ 
      state.chooseItem = props.data
    })

    return {
      ...pageInteractionFun,
      ...toRefs(state),
      applys,
      searchs,
      columns,
      handleOk,
      selectChange,
      typeChange,
      searchChange,
    }
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
    type: state.form.type
  }
  state.loading = true
  // eslint-disable-next-line consistent-return
  post(`${process.env.VUE_APP_BASE_URL}/oa-platform/procInstAuthRel/pageList`, params).then((res)=> {
    state.loading = false
    if(res.code !== 200) return state.tableList = []
    state.tableList = res.data.content
    state.pagination.total = res.data.totalElements
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
    state.pagination.current = page
    getInitData({ state })
  }
  //搜索防抖
  const inputDebounce = _.debounce(() => conditionChange(), 300)
  return {
    conditionChange,
    pageChange,
    inputDebounce,
  }
}
</script>

<style lang="less" scoped>
.link {
  color: #0089ff;
}
</style>