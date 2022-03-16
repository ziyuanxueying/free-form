<template>
  <div>
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
          ellipsis
        >
          <template v-if="column.dataIndex === '收款信息'" #cell="{ record }">
            <div class="cell-item" v-for="(info,key) in record[column.dataIndex]" :key="key">
              <div class="flex-row " v-for="(citem,cindex) in info" :key="cindex">
                <span>
                  {{ cindex }} : {{ citem }}
                </span>
              </div>
            </div>
            <template/>
          </template>
        </a-table-column>
      </template>
    </a-table>

    <a-modal v-model:visible="linkShow" @ok="handleOk" width="800px">
      <template #title>
        关联表单
      </template>
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
import { reactive, toRefs, } from 'vue'
import { post } from '../utils/request'
import _ from 'lodash'
export default {
  data () { 
    return {
      data: [{
        '联系人': 'Jane Doe',
        '供应商编码': 23000,
        '收款信息': [
          {
            '账号': '12313213213',
            '收款人': '张三',
          },
          {
            '账号': '623548951235452',
            '收款人': '李四',
          }
        ],
      }, 
      {
        '联系人': 'Ed Hellen',
        '供应商编码': 17000,
        '收款信息': [
          {
            '账号': '623548951235452',
            '收款人': '王五',
          }
        ]
      }]
    }
  },
  props:{
    item:{ type:Object,default :()=>{}  },
    formData:{ type:Object,default :()=>{}  },
    proxyOptions:{ type:Object,default :()=>{} },
    pathSetObj:{ type:Object ,default :()=>{} },
    ifRequired:{ type:Boolean, default:()=>false },
    ifDisabled:{ type:Boolean, default:()=>false },
    id:{ type: null, }
  },
  emits:['changeData'],
  setup (props,{ emit }) { 
    console.log('props: ', props)
    const state = reactive({ 
      columns:[],
      linkShow: true,
      loading: true,
      form: { type:1 , search:1 },
      pagination: { current: 1, total: 0, },
      tableList:[],
      rowSelection: { type: 'radio' },
      chooseItem: {}
    })

    function setColumns () {
      state.columns = [
        {
          title: '联系人',
          dataIndex: '联系人',
        },{
          title: '供应商编码',
          dataIndex: '供应商编码',
        },
        {
          title: '收款信息',
          dataIndex: '收款信息',
          width:400
        },
      ]
    }
    function getModels () {
      post(`${process.env.VUE_APP_BASE_URL}/oa-platform/infoMeta/dataList`, {
        tableName:1
      }).then((res)=> {
        console.log('res: ', res)
      })
    }

    function handleOk () {
      emit('changeData', state.chooseItem)
    }
    // getInitData({ state })
    const { getInitData, ...pageInteractionFun } = pageInteraction({ state })

    setColumns()
    getInitData()
    return {
      ...toRefs(state),
      setColumns,
      getInitData,
      handleOk,
      ...pageInteractionFun
    }
  },
}
//页面消费函数
function pageInteraction ({ state }) {
  const getInitData = ()=>{
    console.log(123)
    state.loading = true
    post(`${process.env.VUE_APP_BASE_URL}/oa-platform/infoMeta/dataList`, {
      tableName:1
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
    state.chooseItem = _.find(state.tableList, ['id',vals[0]])
    state.chooseItem.link = `/myApply/applyForm?type=apply&preId=${vals[0]}`
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