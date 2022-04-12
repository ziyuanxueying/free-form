<template>
  <div>
    <a-modal v-model:visible="linkShow" @ok="handleOk" width="820px">
      <template #title>
        选择信息库数据
      </template>
      <a-form :model="{}" layout="inline">
        <a-form-item v-for="(search,key) in searchList" :key="key" :label="search.colName">
          <a-input
            v-if="search.uiType ==='NxInput'"
            v-model="search.colValue"
            :style="{ width: '160px' }"
            :placeholder="`请输入`"
            allow-clear
            @clear="conditionChange('inputClear')"
            @input="inputDebounce"
          />
          <a-select
            v-if="search.uiType=='NxSelect'"
            v-model="search.colValue"
            :style="{ width: '160px' }"
            :placeholder="'请选择'"
            allow-clear
            @change="selectChage"
          >
            <a-option v-for="(citem,index) in search.colOptionList" :key="index" :value="citem.key">
              {{ citem.value }}
            </a-option>
          </a-select>
        </a-form-item>
      </a-form>
    
      <ItemOaInfoTable
        :columns="tabs"
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
import { reactive, toRefs, watch , } from 'vue'
import { post } from '../../tools/request'
import _ from 'lodash'
import ItemOaInfoTable from './itemOaInfoTable.vue'
import { useFormConfigStore } from '../../store'
import { getTagData } from '../../utils'
export default {
  components:{ ItemOaInfoTable },
  props:{
    columns:{ type:Array,default :()=>[] },
    colShowList:{ type:Array,default :()=>[] },
    linkShow:{ type:Boolean, default:()=>false },
    formData:{ type:Object,default :()=>{}  },
    ifDisabled:{ type:Boolean, default:()=>false },
    itemUse:{ type:String, default:'oa' },
    infoMetaId:{ type:Number, default:1 },
  },
  emits: ['update:linkShow','update:ifDisabled','modalChoose'],
  setup (props,{ emit }) { 
    const store = useFormConfigStore()
    const state = reactive({ 
      loading: true,
      form: { type:1 , search:1 },
      pagination: { current: 1, total: 0, },
      tabs: [{}],
      tableList:[],
      rowSelection: { type: 'radio',selectedRowKeys:[] },
      chooseItem: {},
      searchList: [{}],
    })

    const { getInitData, ...pageInteractionFun } = pageInteraction({ props,state })
    function handleOk () {
      if(props.itemUse === 'show') {
        console.log('state.chooseItem: ', state.chooseItem)
        emit('modalChoose', state.chooseItem)
        state.chooseItem = {}
        state.rowSelection.selectedRowKeys = []
        return
      }
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
              if(tagFormLink[child].indexOf('upload') !== -1) {
                params[tagFormLink[child]] = item[child].indexOf('[{}]') !== -1 || item[child] === '' ? [] : item[child]
              } 
              else{
                params[tagFormLink[child]] = item[child]
              }
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
    async function getSearchList () {
      state.searchList = await  post('/oa-platform/infoMeta/columnQueryList',
        {
          infoMetaId:props.infoMetaId,
          colShowList:props.colShowList,
        })
    }
    function selectChage () {
      state.pagination.current = 1
      getInitData()
    }

    watch(()=>props.colShowList,()=>{
      getInitData()
      props.infoMetaId && getSearchList()
    },{ immediate:true })

    watch(()=>props.linkShow,(val)=>{
      emit('update:linkShow', val)
    })

    watch(()=>props.columns,(val)=>{
      state.tabs = val.length > 6 ? val.slice(0,6) : val
    },{ immediate:true })
    return {
      ...toRefs(state),
      getInitData,
      getSearchList,
      selectChage,
      handleOk,
      ...pageInteractionFun
    }
  },
}
//页面消费函数
function pageInteraction ({ props, state }) {
  const getInitData = ()=>{
    state.loading = true
    post('/oa-platform/infoMeta/dataList', {
      infoMetaId:props.infoMetaId,
      colShowList: props.colShowList,
      colSearchList: state.searchList,
      page: state.pagination.current,
    }).then((res)=> {
      state.loading = false
      state.tableList = res.content
      return state.pagination.total = res.totalElements
      
    })
  }
  //条件变更需刷新表格数据
  const conditionChange = (str) => {
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
</style>