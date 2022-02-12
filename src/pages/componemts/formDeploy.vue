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
            历史
          </a-button>
          <a-button
            class="operate-btn"
            type="text"
            @click="itemEdit(record,'formShow')"
          >
            填写
          </a-button>
        </template>
      </a-table-column>
    </template>
  </a-table>
  <Child :backModal="backModal" :res="backData" @changeShow="changeShow"/>
</template>

<script>
import { reactive, toRefs, watch  } from 'vue'
import{ post } from '../../tools/request'
import { useRouter } from 'vue-router'
import Child from './childList.vue'
export default {
  components: { 
    Child,
  },
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
    const state = reactive({ 
      dataDeploy:[],
      pageDeploy:{ current: 1,totla: 0 }, 
      tableLoad: false,
      backModal: false,
      backData: {},
    })

    // 获取发布表单列表
    const getListDeploy = async ()=>{
      state.tableLoad = true 
      let data = await post('/oa-platform/formDefDeploy/query',{ online:1,page: state.pageDeploy.current })
      state.tableLoad = false
      state.dataDeploy = data.content
      state.pageDeploy.current = data.number - 1
      state.pageDeploy.total = data.totalElements
    }
    getListDeploy()

    const router = useRouter()
    const itemEdit =  (item,path)=>{
      router.push({
        path: `/${path}`,
        query: { id: item.formId, version:item.version },
      })
    }

    // 分页
    const pageChange = (page)=>{
      state.pageDeploy.current = page
      getListDeploy()
    }
    // 表单回滚
    const itemRollback = async (item)=> {
      state.backModal = true
      state.backData = { projectName:'oa',formId:item.formId	 }
    }
    const changeShow = ()=> {
      state.backModal = false
      state.pageDeploy.current = 1
      getListDeploy()
    }
    
    watch(()=>props.reload,()=>{
      getListDeploy()
    })
    return {
      ...toRefs(state),
      itemEdit,
      pageChange,
      itemRollback,
      changeShow,
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