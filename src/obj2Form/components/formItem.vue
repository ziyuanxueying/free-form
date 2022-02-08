<template>
  <!-- {{ !(pathSetObj[item.configList.fileId]?.hide?hide:false) }} -->
  <a-form-item
    v-show="!hide&&item.type!=='NxCard'"
    :field="item.configList.fileId||item.componentId"
    :label="item.configList.label||item.moduleName"
    :required="ifRequired||(pathSetObj[item.configList.fileId]?.required?required:(item.configList.required||false))"
    :disabled="ifDisabled||(pathSetObj[item.configList.fileId]?.disabled?disabled:(item.configList.disabled||false))"
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
    <a-row v-if="item.type=='NxGrid'" style="width: 100%;">
      <a-col :span="Math.floor(24 / item.configList.layout.colCount)" v-for="(citem,cindex ) in item.configList.layout.colContent" :key="cindex">
        <FormItem
          v-for="(ccitem,ccindex) in citem"
          :item="ccitem"
          :formData="formData"
          :key="ccindex"
          :proxyOptions="proxyOptions"
          :pathSetObj="pathSetObj"
          :ifRequired="ifRequired||(pathSetObj[item.configList.fileId]?.required?required:(item.configList.required||false))"
          :ifDisabled="ifDisabled||(pathSetObj[item.configList.fileId]?.disabled?disabled:(item.configList.disabled||false))"
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
                :ifRequired="ifRequired||(pathSetObj[item.configList.fileId]?.required?required:(item.configList.required||false))"
                :ifDisabled="ifDisabled||(pathSetObj[item.configList.fileId]?.disabled?disabled:(item.configList.disabled||false))"
              />
            </div>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </a-form-item>
  <template v-if="item.type=== 'NxCard'">
    <FormItem
      v-for="(ccitem,ccindex) in item.configList.layout.colContent[0]"
      :item="ccitem"
      :key="ccindex"
      :formData="formData"
      :proxyOptions="proxyOptions"
      :pathSetObj="pathSetObj"
      :ifRequired="ifRequired||(pathSetObj[item.configList.fileId]?.required?required:(item.configList.required||false))"
      :ifDisabled="ifDisabled||(pathSetObj[item.configList.fileId]?.disabled?disabled:(item.configList.disabled||false))"
    />
    <a-button
      v-if="item.configList.layout.ifAdd"
      class="add-btn"
      type="outline"
    >
      添加
    </a-button>
  </template>
</template>
<script>
import { reactive, toRefs, watch } from 'vue-demi'
export default {
  name:'FormItem',
  setup (props) {
    const config = reactive({
      disabled:false,
      required:false,
      hide:false,
    })
    watch(()=>props.formData,()=>{
      let actArr = ['disabled','hide','required']
      console.log(props.pathSetObj[props.item.configList.fileId])
      if(props.pathSetObj[props.item.configList.fileId]) {
        actArr.forEach(item=>{
          let itemLink = props.pathSetObj[props.item.configList.fileId][item]
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
      ...toRefs(config)
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

  }
}
</script>
<style lang="less" scoped>
.add-btn {
  margin: 10px auto;
  width: 400px;
}

</style>