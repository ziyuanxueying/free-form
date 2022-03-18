<template>
  <div>
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
import { reactive, toRefs, watch } from 'vue'
import { post } from '../utils/request'
import _ from 'lodash'
import ItemOaInfoTable from './itemOaInfoTable.vue'
import { useFormConfigStore } from '../../store'
import { getTagData } from '../../utils'
export default {
  components:{ ItemOaInfoTable },
  props:{
    columns:{ type:Array,default :()=>[] },
    colShowList:{ type:Array,default :()=>[] },
    linkShow:{ type:Boolean, default:()=>true },
    formData:{ type:Object,default :()=>{}  },
    ifDisabled:{ type:Boolean, default:()=>false },
    itemUse:{ type:String, default:'oa' },
  },
  emits: ['update:linkShow','update:ifDisabled'],
  setup (props,{ emit }) { 
    console.log('props: ', props)
    const store = useFormConfigStore()
    const state = reactive({ 
      loading: true,
      form: { type:1 , search:1 },
      pagination: { current: 1, total: 0, },
      tableList:[],
      rowSelection: { type: 'radio',selectedRowKeys:[] },
      chooseItem: {},
      data: [{}]
    })

    // getInitData({ state })
    const { getInitData, ...pageInteractionFun } = pageInteraction({ props,state })

    // setColumns()
    // getInitData()

    function handleOk () {
      if(props) return
      let { tagFormLink } =  getTagData({},store.infobaseSet,store.formItemList)
      tagFormLink = _.invert(tagFormLink)
      for (let i in state.chooseItem) {
        if(Array.isArray(state.chooseItem[i])) {
          if (!tagFormLink[i]) continue
          let arr = []
          for(let item of state.chooseItem[i]) {
            let params = { }
            for(let child in item) {
              if (!tagFormLink[child]) continue
              params[tagFormLink[child]] = item[child]
            }
            arr.push(params)
          }
          props.formData[tagFormLink[i]] = arr
        } else {
          tagFormLink[i] && (props.formData[tagFormLink[i]] = state.chooseItem[i])
        }
      }
      state.chooseItem = {}
      state.rowSelection.selectedRowKeys = []
      emit('update:ifDisabled', false)
    }
    watch(()=>props.colShowList,()=>{
      getInitData()
    },{ immediate:true })

    watch(()=>props.linkShow,(val)=>{
      emit('update:linkShow', val)
    })
    return {
      ...toRefs(state),
      getInitData,
      handleOk,
      ...pageInteractionFun
    }
  },
}
//页面消费函数
function pageInteraction ({ props, state }) {
  const getInitData = ()=>{
    state.loading = true
    post(`${process.env.VUE_APP_BASE_URL}/oa-platform/infoMeta/dataList`, {
      infoMetaId:1,
      colShowList: props.colShowList
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
    state.rowSelection.selectedRowKeys = vals
    state.chooseItem = _.find(state.tableList, ['id',vals[0]])
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