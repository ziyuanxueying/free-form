<template>
  <div class="list-view">
    <div class="list-title">
      草稿表单
    </div>
    <a-table
      row-key="formId"
      :columns="columns"
      :data="data"
      :row-selection="rowSelection"
      :pagination="data.length ? pagination: false"
      @pageChange="pageChange"
      :loading="tableLoad"
      :bordered="{wrapper: true, cell: true}"
      @selectionChange="(vals)=>{selectList = vals}"
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
              @click="itemEdit(record,'configPage')"
            >
              编辑
            </a-button>
            <a-button
              class="operate-btn deploy"
              type="text"
              @click="$modal.info({ title:`点击确认发布 ${record.title} 表单`, onOpen:onOpen(record), onBeforeOk: formDeploy})"
            >
              发布
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <a-space>
      <a-button class="del-some add" @click="itemEdit({},'configPage')">
        <template #icon>
          <icon-plus/>
        </template>
        新建
      </a-button>
      <a-button class="del-some" @click="itemDel">
        批量删除
      </a-button>
    </a-space>
    <div class="list-title">
      发布表单
    </div>
    <FormDeploy :reload="reload"/>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, } from 'vue'
import{ post } from '../tools/request'
import { useRouter } from 'vue-router'
import FormDeploy from './componemts/formDeploy.vue'
export default defineComponent({
  components:{ FormDeploy },
  data () { 
    return {
      columns: [
        { title: '表单ID', dataIndex: 'formId', width: 150, },
        { title: '表单名称', dataIndex: 'title', width: 150, },
        { title: '项目名', dataIndex: 'projectName', width: 150, },
        { title: '操作人', dataIndex: 'updateUserName', width: 150, },
        { title: '操作', dataIndex: 'operate', width: 150, },
      ],
      rowSelection: {
        type: 'checkbox',
        showCheckedAll: true
      },
    }
  },
  setup () { 
    const state = reactive({ 
      data:[],
      selectList:[],
      pagination:{ current: 1,totla: 0 },
      tableLoad: false,
      selectItem: undefined,
      reload: 0
    })
    const getListDraft = async ()=>{
      let data = await post('/formDef/query')
      state.tableLoad = false
      state.data = data.content
      state.pagination.current = data.number - 1
      state.pagination.total = data.totalElements
    }
    getListDraft()
    const router = useRouter()
    const itemEdit = (item,path)=>{
      router.push({
        path: `/${path}`,
        query: { id: item.formId },
      })
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
   
    const onOpen = (item)=> {
      state.selectItem = item
    }
    // 部署表单
    const formDeploy = async (done)=> {
      try {
        let data = await post(`/formDefDeploy/deploy/${state.selectItem.formId}`)
        console.log('data: ', data)
        state.reload++
        // getListDeploy()
        done()
      } catch (error) {
        done()
      }
    }
    // 批量删除
    const itemDel = async ()=>{
      try {
        await post('/formDef/delete',{ formIds:state.selectList })
        getListDraft()
      } catch (error) {
        console.log('error: ', error)
      }
    }
   
    return {
      ...toRefs(state),
      getListDraft,
      //   getListDeploy,
      itemEdit,
      formChange,
      pageChange,
      onOpen,
      formDeploy,
      itemDel,
    }
  },
  mounted () {
  },
  methods:{

  },
})
</script>

<style lang="less" scoped>
.list-view {
  padding: 20px;

  .list-title {
    margin-bottom: 10px;
    font-size: 30px;
    font-weight: bolder;
  }

  .del-some {
    position: relative;
    top: -30px;
    color: white;
    background-color: #f53f3f;

    &.add {
      background-color: #0089ff;
    }
  }
}
</style>