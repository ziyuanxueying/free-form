<template>
  <div class="title-link">
    关联表单信息
  </div>
  <a-tooltip
    position="bl"
    v-for="(item,index) in linkStore"
    :key="item.id"
    :content="`请选择${item.value}`"
    :content-class="item.value.length <8 ?'tooltip-hide':''"
    :arrow-class="item.value.length <8 ?'tooltip-hide':''"
  >
    <a-form-item
      :label="`请选择${item.value}`"
      :label-col-props="{xs:20,lg:4}"
      :wrapper-col-props="{span:20}"
      @click="formClick(item,index)"
      :disabled="!['copy','edit'].includes($route.query.type)"
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
import { add,evaluate } from 'mathjs'
import { Message } from '@arco-design/web-vue'
import { useRoute } from 'vue-router'
import _ from 'lodash'
const applys = [{ key: 1, value:'本人发起' },{ key:2, value:'他人发起' }]
const searchs = [{ key: 1, value:'表单标题' },{ key:2, value:'发起人' },{ key:3, value:'申请时间' }]
const columns = [  
  { title: '表单类型', dataIndex: 'tplClassifyName',  width: 80, align: 'left', },
  { title: '表单标题', dataIndex: 'title', width: 180 ,align:'left' },
  { title: '发起人', dataIndex: 'applyUserName', width: 120, align: 'left' },
  { title: '申请时间', dataIndex: 'submitTime', width: 150, align: 'left' }]
export default {
  props:{
    formData:{ type:Object,default :()=>{}  },
    ifDisabled:{ type:Boolean, default:()=>false },
  },
  emits: ['update:ifDisabled','modalChoose'],
  setup (props,{ emit }) { 
    const route = useRoute()
    const config = useFormConfigStore()
    const state = reactive({ 
      linkStore: [], 
      relations: [], 
      linkShow: false,
      form: { type:1 , search:1, draftTime:[] },
      pagination: { current: 1, total: 0, },
      tableList:[],
      rowSelection: { type: 'radio', selectedRowKeys:[]  },
      chooseItem: { id: 0 },
      loading: false
    })

    function formClick (item,index) {
      if(!['copy','edit'].includes(route.query.type)) { return }
      item.index = index
      state.chooseItem = item
      state.linkShow = true
      typeChange()
    }

    const selectChange = async (vals) => {
      state.rowSelection.selectedRowKeys = vals
      state.linkStore[state.chooseItem.index].res = await API.getFormItems(vals[0])
      state.linkStore[state.chooseItem.index].formTitle =  _.find(state.tableList,['id',vals[0]]).title
    }

    function cancelModal () {
      state.form = { type:1 , search:1, draftTime:[] }
      state.rowSelection.selectedRowKeys = []
    }

    const { watchFormChange } = watchLink({ props, state })
    function handleOk () {
      if(!state.rowSelection.selectedRowKeys.length) {
        return Message.warning('请选择关联表单')
      }
      state.rowSelection.selectedRowKeys = []
      watchFormChange()
      return emptyCheck()
    }
    function emptyCheck () {
      let empty = state.linkStore.find((item)=>{
        return item.res === undefined
      })
      if(!empty) {
        props.formData.linkStore = state.linkStore
        emit('update:ifDisabled', false)
      }
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

    const pageInteractionFun = pageInteraction({ state })

    config.$onAction(({ store, })=>{
      setTimeout(() => {
        state.linkStore = props.formData.linkStore ? props.formData.linkStore : store.relationSet.templates
        state.relations = store.relationSet.components
        if(state.linkStore.length && ['copy','edit'].includes(route.query.type)) {
          getInitData({ state })
          emit('update:ifDisabled', true)
          emptyCheck()
        }
      }, 10)
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
    state.pagination.current = page
    getInitData({ state })
  }

  return {
    conditionChange,
    pageChange,
  }
}

function watchLink ({ props,state }) {
  function watchFormChange () {
    let singles = _.filter(state.relations,item=>{
      return state.chooseItem.id === item.relationTem && item.nodePathArray.length === 1
    })
    if(singles) {
      for (const single of singles) {
        console.log('single: ', single)
        props.formData[single.orgComponentId] = linkSingle(single,state.linkStore[state.chooseItem.index].res).val
      }
    }

    let complexs = _.filter(state.relations,item=>{
      return state.chooseItem.id === item.relationTem && item.nodePathArray.length > 1
    })

    let tabs = _(complexs).map(item=>{
      return item.nodePathArray[0]
    }).uniq().value()
   
    for (const tab of tabs) {
      let arr = _(complexs).filter(item=>{
        return item.nodePathArray[0] === tab
      }).value()
      let tabVal = state.linkStore[state.chooseItem.index].res[tab]
      let formArr = []
      for (let index = 0; index < arr.length; index++) {
        const tabLink = arr[index]
        let aaa =  _.map(tabVal,item=>{
          let obj = {}
          if(tabLink.relationCur) {
            tabLink.relationFuncId =  linkSingle(tabLink,item).func
          } else {
            obj[tabLink.orgComponentId] = linkSingle(tabLink,item).val + ''
            console.log('obj: ', obj)
          }
          return { ...obj }
        })
        formArr = _.merge(aaa,formArr)
      }
      props.formData[tab] = formArr
    }
  }

  function linkSingle (single,res) {
    let val,func
    if(single.relationFuncId) {
      // 关联类型，函数
      // 根据{} 拆解因子，拆成一个数组
      let array = single.relationFuncId.match(/[^{]+(?=\})/g) 
      // 动态监听每个因子的变化
      let formula = single.relationFuncId
      let isNum = true
      for (const formVal of array) {
        // 将因子式中的ID 替换成数组中对应的值，没有就取 0
        // 类似于 {id1}*{id2} => 12*3
        // let num = evaluate(formVal, curForm)
        let num = res[formVal] 
        if(!num) {
          isNum = false
          continue
        }
        formula = formula.replace(`{${formVal}}`, isNaN(num) ? 0 : num)
      }
      // 根据函数算出值
      if(!isNum) {
        func = formula
      }else{
        val = evaluate(formula)
      }
    } else if(single.relationType === '0') {
      // 关联类型，相等
      val = res[single.relationCompo]
    } else if(single.relationType === '1') {
      //关联类型， 统计
      switch (single.relationTypePath.length) {
      case 1:
        val = res[single.relationCompo]
        break
      case 2:
        val = add(..._(res[single.relationTypePath[0]]).map(item=>{
          return item[single.relationTypePath[1]]
        }).compact().value(),0)
        break
      }
    } 
    return { val,func }
  }

  return {
    watchFormChange
  }
}
</script>

<style lang="less" scoped>
@import url('../../style/obg2form.less');

.title-link {
  margin-bottom: 14px;
  font-size: 16px;
  font-weight: bold;
}
</style>