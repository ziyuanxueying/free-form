<template>
  <a-form-item
    v-show="!hide&&item.type!=='NxCard'"
    :field="id"
    :label="item.configList.label||item.moduleName"
    :required="ifRequired||(pathSetObj[id]?.required?required:(item.configList.required||false))"
    :disabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))"
    :validate-trigger="['change','input']"
  >
    <a-input v-if="item.type=='NxInput'" v-model="formData[item.configList.fileId]" :placeholder="item.configList.placeholder||'请输入'"/>
    <a-textarea
      v-if="item.type=='NxTextarea'"
      v-model="formData[item.configList.fileId]"
      :placeholder="item.configList.placeholder||'请输入'"
      :max-length="item.configList.maxLength"
    />
    <a-input
      v-else-if="item.type=='NxInputNum'"
      v-model="formData[item.configList.fileId]"
      :placeholder="item.configList.placeholder||'请输入'"
      :min="item.configList.min"
      :max="item.configList.max"
    />
    <a-typography-paragraph v-if="item.type=='NxText'" :style="`width: 100%; text-align:${item.configList.position||'left'};`">
      {{ item.configList.defaultContent }}
    </a-typography-paragraph>
    <a-date-picker
      v-if="item.type=='NxDatePicker'"
      :placeholder="item.configList.placeholder||'请输入'"
      allow-clear
      v-model="formData[item.configList.fileId]"
      :format="item.configList.format"
    />
    <a-range-picker v-if="item.type=='NxRangePicker'" v-model="formData[item.configList.fileId]" allow-clear/>
    <a-switch v-if="item.type=='NxSwitch'" v-model="formData[item.configList.fileId]"/>
    <a-select v-if="item.type=='NxSelect'" v-model="formData[item.configList.fileId]" :placeholder="item.configList.placeholder||'请选择'">
      <a-option v-for="(citem,index) in proxyOptions[item.configList.fileId]" :key="index">
        {{ citem.value }}
      </a-option>
    </a-select>
    <a-space v-if="item.type=='NxCheckbox'" direction="vertical" size="large">
      <a-checkbox-group v-model="formData[item.configList.fileId]" :disabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))">
        <a-checkbox v-for="(citem,index) in proxyOptions[item.configList.fileId]" :key="index" :value="citem.key">
          {{ citem.value }}
        </a-checkbox>
      </a-checkbox-group>
    </a-space>
    <a-row v-if="item.type=='NxGrid'" style="width: 100%;">
      <a-col :span="Math.floor(24 / item.configList.layout.colCount)" v-for="(citem,cindex ) in item.configList.layout.colContent" :key="cindex">
        <FormItem
          v-for="(ccitem,ccindex) in citem"
          :item="ccitem"
          :formData="formData"
          :key="ccindex"
          :proxyOptions="proxyOptions"
          :pathSetObj="pathSetObj"
          :ifRequired="ifRequired||(pathSetObj[id]?.required?required:(item.configList.required||false))"
          :ifDisabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))"
          :id="ccitem.configList.fileId||ccitem.componentId"
        />
      </a-col>
    </a-row>
    <a-table
      v-if="item.type=='NxTable'"
      :data="tableData"
      :bordered="{wrapper: true, cell: true}"
      :pagination="false"
      style="width: 100%;"
    >
      <template #columns>
        <a-table-column
          v-for="(citem,index) in item.configList.layout.columns"
          :key="index"
          :title="citem.value"
          :data-index="citem.key"
        >
          <template #cell>
            <div class="nxf-table-td">
              <FormItem
                v-for="(ccitem,ccindex) in item.configList.layout.colContent[index]"
                :item="ccitem"
                :key="ccindex"
                :formData="formData"
                :proxyOptions="proxyOptions"
                :pathSetObj="pathSetObj"
                :ifRequired="ifRequired||(pathSetObj[id]?.required?required:(item.configList.required||false))"
                :ifDisabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))"
                :id="ccitem.configList.fileId||ccitem.componentId"
              />
            </div>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </a-form-item>
  <template v-if="item.type=== 'NxCard'">
    <div v-if="item.configList.layout.ifAdd" v-show="!hide" class="card-view">
      <div
        class="card-item"
        v-for="(ditem,dindex) in formData[item.configList.layout.fileId]"
        :key="dindex"
      >
        <div class="flex-row">
          <div class="form-view">
            <FormItem
              v-for="(ccitem,ccindex) in item.configList.layout.colContent[0]"
              :item="ccitem"
              :key="ccindex"
              :formData="ditem"
              :proxyOptions="proxyOptions"
              :pathSetObj="pathSetObj"
              :ifRequired="ifRequired||(pathSetObj[id]?.required?required:(item.configList.required||false))"
              :ifDisabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))"
              :id="ccitem.configList.fileId||ccitem.componentId"
            />
          </div>
          <a-button
            :style="!dindex&&'visibility:hidden'"
            type="outline"
            status="danger"
            shape="circle"
            @click="cardDelete(dindex)"
          >
            <icon-delete/>
          </a-button>
        </div>
      </div>
      <a-button
        v-if="item.configList.layout.ifAdd"
        class="add-btn"
        type="outline"
        @click="cardAdd"
      >
        添加
      </a-button>
    </div>
    <template v-else>
      <div v-show="!hide">
        <FormItem
          v-for="(ccitem,ccindex) in item.configList.layout.colContent[0]"
          :item="ccitem"
          :key="ccindex"
          :formData="formData"
          :proxyOptions="proxyOptions"
          :pathSetObj="pathSetObj"
          :ifRequired="ifRequired||(pathSetObj[id]?.required?required:(item.configList.required||false))"
          :ifDisabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))"
          :id="ccitem.configList.fileId||ccitem.componentId"
        />
      </div>
    </template>
  </template>
</template>
<script>
import { reactive, toRefs, watch } from 'vue-demi'
import{ getForm } from '../utils'
// import { useFormConfigStore } from '../../store'
export default {
  name:'FormItem',
  setup (props) {
    const config = reactive({
      disabled:false,
      required:false,
      hide:false,
    })

    const cardAdd = ()=> {
      let formCard = getForm(props.item.configList.layout.colContent[0])
      props.formData[props.item.configList.layout.fileId].push(formCard.form)
    }
    const cardDelete = (dindex)=>{
      props.formData[props.item.configList.layout.fileId].splice(dindex,1)
    }
    watch(()=>props.formData,()=>{
      let actArr = ['disabled','hide','required']
      if(props.pathSetObj[props.id]) {
        actArr.forEach(item=>{
          let itemLink = props.pathSetObj[props.id][item]
          if(itemLink) {
            if(itemLink.equation === 'equal') {
              // eslint-disable-next-line eqeqeq
              config[item] = props.formData[itemLink.parentProp] == itemLink.value
            }else{
              // eslint-disable-next-line eqeqeq
              config[item] = props.formData[itemLink.parentProp] != itemLink.value
            }
          }
        })
      }
    },{ deep: true,immediate:true })
    return {
      tableData:[{}],
      ...toRefs(config),
      cardAdd,
      cardDelete,
    }
  },
  props:{
    item:{
      type:Object
    },
    formData:{
      type:Object
    },
    proxyOptions:{
      type:Object
    },
    pathSetObj:{
      type:Object
    },
    ifRequired:{
      type:Boolean,
      default:()=>false
    },
    ifDisabled:{
      type:Boolean,
      default:()=>false
    },
    id:{
      type:null,
    }
  }
}
</script>
<style lang="less" scoped>
.card-view {
  margin: 10px 0;

  .card-item {
    margin: 10px 0;
    border: 1px solid #eee;
    padding-top: 10px;
    background-color: #f7f7f8cc;

    .form-view {
      flex: 1;
      margin-right: 10px;
    }
  }

  .add-btn {
    display: block;
    margin: auto;
    width: 400px;
  }
}

</style>