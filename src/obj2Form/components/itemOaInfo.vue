<template>
  <div style="width: 100%;">
    <ItemOaInfoTable
      v-if="item.configList.oaChooseDataitem.length>1"
      :columns="[...columns, ...[{
        colName: '操作',
        tableName: '',
        dataIndex: 'operate',
        width: 110,
        align:'center'
      }]]"
      :data="formData[item.configList.fileId]"
      @btnClick="btnClick"
    />
    <a-form-item v-else-if="item.configList.oaChooseDataitem.length === 1" :label="item.configList.label" :label-col-props="{xs:4,lg:span?span:4}">
      <a-input
        v-model="formData[item.configList.fileId][0][columns[0].dataIndex]"
        placeholder="请点击选择"
        :style="{ width: '300px' }"
        readonly
        @click="linkShow = true"
      />
    </a-form-item>
    <ItemOaInfoModal
      v-model:linkShow="linkShow"
      :columns="columns"
      :formData="formData"
      :infoMetaId="item.configList.oaChooseInfobase"
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
      data: [{}],
      itemIndex: 0,
    })

    function setColumns () {
      console.log('props.item.configList: ', props.item.configList)
      state.columns = _.chain(props.item.configList.oaChooseDataitem)
        .map((item)=>{ 
          return { 
            colName:item.colName, 
            dataIndex:item.tableName || item.colName,
            tableName :item.tableName ,
          } 
        }).uniqBy('dataIndex').value()
    }

    function modalChoose (val) {
      if(_.isEmpty(val)) return
      if(JSON.stringify(props.formData[props.item.configList.fileId][0]) === '{}' 
         || state.columns.length === 1) {
        props.formData[props.item.configList.fileId][0] = val
        return
      }
      props.formData[props.item.configList.fileId].splice(state.itemIndex + 1, 0, val)
    }

    function btnClick (val,index) {
      if(val === 'add') {
        state.linkShow = true
        state.itemIndex = index
      } else {
        props.formData[props.item.configList.fileId].splice(index,1)
      }
    }

    watch(()=>props.formData[props.item.configList.fileId],(val)=>{
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