<template>
  <a-table
    row-key="id"
    :columns="columns"
    :data="data"
    :bordered="{wrapper: true, cell: true}"
    v-bind="$attrs"
  >
    <template #columns>
      <a-table-column
        v-for="(column, index) in columns"
        :key="index"
        :title="column.tableName !==''? column.tableName : column.colName"
        :data-index="column.dataIndex"
        :width="column.width"
        :fixed="column.fixed"
        :align="column.align ? column.align : 'left'"
      >
        <template v-if="['operate',column.tableName].includes(column.dataIndex)" #cell="{ record,rowIndex }">
          <div class="cell-item" v-for="(info,key) in record[column.dataIndex]" :key="key">
            <div v-for="(citem,cindex) in info" :key="cindex">
              {{ cindex }} : {{ citem }} 
            </div>
          </div>
          <div v-if="column.dataIndex === 'operate'">
            <a-button
              class="operate-btn"
              type="text"
              @click="btnClick('add',rowIndex)"
            >
              添加
            </a-button>
            <a-button
              v-if="rowIndex"
              class="operate-btn"
              type="text"
              @click="btnClick('del',rowIndex)"
            >
              删除
            </a-button>
          </div>
          <template/>
        </template>
      </a-table-column>
    </template>
  </a-table>
</template>

<script>
import { reactive, toRefs, } from 'vue'
export default {
  props:{
    columns:{ type:Array,default :()=>[] }, 
    data:{ type:Array,default :()=>[] }, 
  },
  emits:['btnClick'],
  setup (props,{ emit }) { 
    const state = reactive({ 
      tabs:[]
    })
    function btnClick (type,index) {
      emit('btnClick',type,index)
    }
   
    return {
      ...toRefs(state),
      btnClick,
    }
  },
  mounted () {
  },
  methods:{

  },
}
</script>

<style lang="less" scoped>
.cell-item {
  margin: 0 -16px;
  padding: 0 10px 0;

  &:nth-child(n) {
    margin-bottom: 4px;
    border-bottom: 1px solid var(--color-neutral-3);
    padding-bottom: 4px;
  }

  &:nth-last-child(2) {
    margin-bottom: -2px;
    border: none;
  }
}

.operate-btn {
  padding: 0 4px;

  &.del {
    color: #fe5656;
  }
}
</style>