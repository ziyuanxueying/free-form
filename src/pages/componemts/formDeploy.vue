<template>
  <a-table
    row-key="name"
    :columns="columnDeploy"
    :data="dataDeploy"
    :pagination="dataDeploy.length ? pageDeploy: false"
    @pageChange="pageChange"
    :loading="tableLoad"
    :bordered="{wrapper: true, cell: true}"
  >
    <template #columns>
      <a-table-column
        v-for="(column,index) in columnDeploy"
        :key="index"
        :title="column.title"
        :data-index="column.dataIndex"
        :width="column.width"
        :fixed="column.fixed"
        ellipsis
        align="center"
      >
        <template v-if="column.dataIndex === 'operate'" #cell="{ record }">
          <a-button
            class="operate-btn"
            type="text"
            @click="itemEdit(record,'configPage')"
          >
            编辑
          </a-button>
          <a-button
            class="operate-btn back"
            type="text"
            @click="itemRollback(record)"
          >
            回滚
          </a-button>
        </template>
      </a-table-column>
    </template>
  </a-table>
</template>

<script>
import { reactive, toRefs, watch  } from 'vue'
import{ post } from '../../tools/request'
import { useRouter } from 'vue-router'
export default {
  data () { 
    return {
      columnDeploy: [
        { title: '表单ID', dataIndex: 'formId', width: 150, },
        { title: '表单名称', dataIndex: 'title', width: 150, },
        { title: '项目名', dataIndex: 'projectName', width: 150, },
        { title: '操作人', dataIndex: 'deployUserName', width: 150, },
        { title: '版本号', dataIndex: 'version', width: 150, },
        { title: '操作', dataIndex: 'operate', width: 150, },
      ]
    }
  },
  props:{
    reload:{
      type:Number
    },
  },
  setup (props) { 
    console.log('props: ', props)
    const state = reactive({ 
      dataDeploy:[],
      pageDeploy:{ current: 1,totla: 0 }, 
      tableLoad: false,
    })

    // 获取发布表单列表
    const getListDeploy = async ()=>{
      let data = await post('/formDefDeploy/query',{ online:1 })
      state.tableLoad = false
      state.dataDeploy = data.content
      state.pageDeploy.current = data.number - 1
      state.pageDeploy.total = data.totalElements
    }
    getListDeploy()

    const router = useRouter()
    const itemEdit =  (item,path)=>{
      console.log('item: ', state.selectList)
      router.push({
        path: `/${path}`,
        query: { id: item.formId, version:item.version },
      })
    }

    // 分页
    const pageChange = (page)=>{
      state.pagination.current = page
      getListDeploy()
    }

    watch(()=>props.reload,()=>{
      getListDeploy()
    })
    return {
      ...toRefs(state),
      itemEdit,
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
</style>