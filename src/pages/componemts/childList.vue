<template>
  <a-modal
    :width="800"
    :visible="backModal"
    title="选择回滚版本"
  >
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
              查看版本
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </a-modal>
</template>

<script>
import { reactive,  toRefs, watch } from 'vue'
import{ post } from '../../tools/request'
import { useRouter } from 'vue-router'
export default {
  data () { 
    return {
      columnDeploy: [
        { title: '表单ID', dataIndex: 'formId', width: 150, },
        { title: '表单名称', dataIndex: 'title', width: 150, },
        { title: '项目名', dataIndex: 'projectName', width: 100, },
        { title: '操作人', dataIndex: 'deployUserName', width: 80, },
        { title: '版本号', dataIndex: 'version', width: 80, },
        { title: '操作', dataIndex: 'operate', width: 140, },
      ]
    }
  },
  props:{
    backModal: {
      type:Boolean
    },
    res: {
      type:Object
    },
  },
  model: { prop: 'backModal', event: 'changeShow' },
  emits: ['changeShow'],
  setup (props,ctx) { 
    const state = reactive({ 
      dataDeploy:[],
      pageDeploy:{ current: 1,totla: 0 }, 
      tableLoad: false,
      res:props.res
    })
    const rollbackList = async ()=> {
      try {
        let data  = await post('/oa-platform/formDefDeploy/query', { ...state.res, page: state.pageDeploy.current })
        state.dataDeploy = data.content
        state.pageDeploy.current = data.number - 1
        state.pageDeploy.total = data.totalElements
      } catch (error) {
        console.log('error: ', error)
      }
    }
    // 分页
    const pageChange = (page)=>{
      console.log('page: ', page)
      state.pageDeploy.current = page
      rollbackList()
    }
    const router = useRouter()
    const itemEdit =  (item,path)=>{
      router.push({
        path: `/${path}`,
        query: { id: item.formId, version:item.version, history:true },
      })
    }
    // 表单回滚
    const itemRollback = async (item)=> {
      try {
        let data = await post('/oa-platform/formDefDeploy/rollback',{ formId:item.formId, version:item.version })
        console.log('data: ', data)
        ctx.emit('changeShow', false)
      } catch (error) {
        console.log('error: ', error)
      }
    }

    watch(()=>props.res,(val)=>{
      state.res = val
      rollbackList()
    })
    return {
      ...toRefs(state),
      itemEdit,
      pageChange,
      itemRollback,
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