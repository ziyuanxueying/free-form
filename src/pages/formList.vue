<template>
  <div class="list-view">
    <div class="list-title">
      草稿表单
    </div>
    <a-table
      row-key="name"
      :columns="columns"
      :data="data"
      :pagination="data.length ? pagination: false"
      @pageChange="pageChange"
      :loading="tableLoad"
      :bordered="{wrapper: true, cell: true}"
    >
      <template #columns>
        <a-table-column
          v-for="(column,index) in columns"
          :key="index"
          :title="column.title"
          :data-index="column.dataIndex"
          :width="column.width"
          :fixed="column.fixed"
          ellipsis
          align="center"
        >
          <template v-if="column.dataIndex === 'fileName'" #cell="{ record }">
            <div style="color: red;">
              {{ record.fileName }}
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operate'" #cell="{ record }">
            <a-button
              class="operate-btn"
              type="text"
              @click="itemEdit(record)"
            >
              编辑
            </a-button>
            <a-button
              class="operate-btn deploy"
              type="text"
              @click="itemEdit(record)"
            >
              发布
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <div class="list-title">
      发布表单
    </div>
    <a-table
      row-key="name"
      :columns="columns"
      :data="dataDeploy"
      :pagination="dataDeploy.length ? pageDeploy: false"
      @pageChange="pageChange"
      :loading="tableLoad"
      :bordered="{wrapper: true, cell: true}"
    >
      <template #columns>
        <a-table-column
          v-for="(column,index) in columns"
          :key="index"
          :title="column.title"
          :data-index="column.dataIndex"
          :width="column.width"
          :fixed="column.fixed"
          ellipsis
          align="center"
        >
          <template v-if="column.dataIndex === 'fileName'" #cell="{ record }">
            <div style="color: red;">
              {{ record.fileName }}
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operate'" #cell="{ record }">
            <a-button
              class="operate-btn"
              type="text"
              @click="itemEdit(record)"
            >
              编辑
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<script>
import { reactive, toRefs, } from 'vue'
import{ post } from '@request'
import { useRouter } from 'vue-router'
export default {
  data () { 
    return {
      columns: [
        { title: '表单ID', dataIndex: 'formId', width: 150, },
        { title: '表单名称', dataIndex: 'title', width: 150, },
        { title: '项目名', dataIndex: 'projectName', width: 150, },
        { title: '操作人', dataIndex: 'updateUserName', width: 150, },
        { title: '操作', dataIndex: 'operate', width: 150, },
      ]
    }
  },
  setup () { 
    const state = reactive({ 
      data:[],
      pagination:{ current: 1,totla: 0 },
      dataDeploy:[],
      pageDeploy:{ current: 1,totla: 0 },
      tableLoad: false
    })
    const getListDraft = async ()=>{
      let data = await post('/formDef/query')
      state.tableLoad = false
      state.data = data.content
      state.pagination.current = data.number 
      state.pagination.total = data.totalElements
    }
    const getListDeploy = async ()=>{
      let data = await post('/formDefDeploy/query')
      state.tableLoad = false
      state.dataDeploy = data.content
      state.pageDeploy.current = data.number 
      state.pageDeploy.total = data.totalElements
    }
    getListDraft()
    const router = useRouter()
    const itemEdit = async (item)=>{
      console.log('item: ', item)
      router.push({
        path: '/configPage',
        query: { id: item.formId },
      })
    //   let data = await post(`/formDef/get/${item.formId}`)
    //   console.log('data: ', data.formDefJson)
    }

    const formChange = ()=>{
      state.pagination.current = 1
      getListDraft()
    }
    // 分页
    const pageChange = (page)=>{
      state.pagination.current = page
      getListDraft()
    }
    return {
      ...toRefs(state),
      getListDraft,
      getListDeploy,
      itemEdit,
      formChange,
      pageChange,
    }
  },
  mounted () {
  },
  methods:{

  },
}
</script>

<style lang="less" scoped>
.list-view {
  padding: 20px;

  .list-title {
    margin-bottom: 10px;
    font-size: 30px;
    font-weight: bolder;
  }

  .operate-btn {
    padding: 0 8px;
    color: #0089ff;

    &.deploy {
      color: #690;
    }
  }
}
</style>