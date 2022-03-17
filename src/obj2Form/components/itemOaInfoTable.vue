<template>
  <div>
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
          :title="column.title || column.tableName"
          :data-index="column.dataIndex"
          :width="column.width"
          :fixed="column.fixed"
          :align="column.align ? column.align : 'center'"
          ellipsis
        >
          <template v-if="['operate',column.tableName].includes(column.dataIndex)" #cell="{ record,rowIndex }">
            <!-- <template v-if="['operate','收款信息'].includes(column.dataIndex)" #cell="{ record,rowIndex }"> -->
            <div class="cell-item" v-for="(info,key) in record[column.dataIndex]" :key="key">
              <div class="flex-row " v-for="(citem,cindex) in info" :key="cindex">
                <span>
                  {{ cindex }} : {{ citem }}
                </span>
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
  </div>
</template>

<script>
import { reactive, toRefs,  } from 'vue'
export default {
  props:{
    columns:{ type:Array,default :()=>[] }, 
    data:{ type:Array,default :()=>[] }, 
    tableOps:{ type:Object,default :()=>{} }, 
  },
  emits:['btnClick'],
  setup (props,{ emit }) { 
    const state = reactive({ 
      pagination: { current: 1, total: 0, },
    })
    function btnClick (type,index) {
      emit('btnClick',type,index)
    }
    // const pageInteractionFun = pageInteraction({ state })

    // getInitData()
    return {
      ...toRefs(state),
      btnClick,
    //   ...pageInteractionFun,
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

.operate-btn {
  padding: 0 4px;

  &.del {
    color: #fe5656;
  }
}
</style>