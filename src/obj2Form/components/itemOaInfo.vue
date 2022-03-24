<template>
  <div>
    <ItemOaInfoTable
      :columns="[...columns, ...[{
        colName: '操作',
        dataIndex: 'operate',
        width: 100
      }]]"
      :data="formData[item.configList.fileId]"
      @btnClick="btnClick"
    />

    <ItemOaInfoModal
      v-model:linkShow="linkShow"
      :columns="columns"
      :formData="formData"
      :colShowList="item.configList.oaChooseDataitem"
      :itemUse="`show`"
      @modalChoose="modalChoose"
    />
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
import _ from 'lodash'
import ItemOaInfoTable from './itemOaInfoTable.vue'
import ItemOaInfoModal from './itemOaInfoModal.vue'
export default {
  components:{ ItemOaInfoTable,ItemOaInfoModal },
  props:{
    item:{ type:Object,default :()=>{}  },
    formData:{ type:Object,default :()=>{}  },
    proxyOptions:{ type:Object,default :()=>{} },
    pathSetObj:{ type:Object ,default :()=>{} },
    ifRequired:{ type:Boolean, default:()=>false },
    ifDisabled:{ type:Boolean, default:()=>false },
    id:{ type:null, },
  },
  //   emits:['changeData'],
  setup (props) { 
    const state = reactive({ 
      columns: [],
      linkShow: false,
      loading: true,
      form: { type:1 , search:1 },
      pagination: { current: 1, total: 0, },
      tableList:[],
      rowSelection: { type: 'radio' },
      data: [{}]
    })

    function setColumns () {
      state.columns = _.chain(props.item.configList.oaChooseDataitem)
        .map((item)=>{ 
          return { 
            colName:item.colName, 
            dataIndex:item.tableName || item.colName,
            tableName :item.tableName ,
            width :item.tableName ? 150 : 120
          } 
        })
        .uniqBy('dataIndex').value()
    }

    function modalChoose (val) {
      if(JSON.stringify(props.formData[props.item.configList.fileId][0]) === '{}') {
        props.formData[props.item.configList.fileId][0] = val
        return
      }
      props.formData[props.item.configList.fileId].push(val)
    }

    function btnClick (val,index) {
      if(val === 'add') {
        state.linkShow = true
      }else {
        props.formData[props.item.configList.fileId].splice(index,1)
      }
    }
    watch(()=>props.formData[props.item.configList.fileId],(val)=>{
      console.log('val: ', val)
      !val && (props.formData[props.item.configList.fileId] = [{}])
    //   if(val) return
    },{ immediate:true })
    setColumns()
    return {
      ...toRefs(state),
      setColumns,
      modalChoose,
      btnClick,
    }
  },
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