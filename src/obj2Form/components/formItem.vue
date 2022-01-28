<template>
  <span>
    <a-form-item
      :field="item.configList.fileId||item.fieldId"
      :label="item.configList.label||item.moduleName"
      v-for="item in formObj"
      :key="item.configList.fileId"
      :required="item.configList.required||false"
      :disabled="item.configList.disabled||false"
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
        v-if="item.type=='NxInputNum'"
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
      <a-row v-if="item.type=='NxGrid'" style="width:100%">
        <a-col :span="24 / item.configList.layout.colCount" v-for="(citem,index ) in item.configList.layout.colContent" :key="index">
          <FormItem :formObj="citem" :formData="formData"/>
        </a-col>
      </a-row>
      <a-table
        :data="tableData"
        :bordered="{wrapper: true, cell: true}"
        :pagination="false"
        v-if="item.type=='NxTable'"
        style="width:100%"
      >
        <template #columns>
          <a-table-column
            v-for="(citem,index) in item.configList.layout.columns"
            :key="index"
            :title="citem.value"
            :data-index="citem.key"
          >
            <template #cell>
              <div class="nxf-table-td" :key="ccindex">
                <FormItem :formObj="item.configList.layout.colContent[index]" :formData="formData" :proxyOptions="proxyOptions"/>
              </div>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-form-item>
  </span>
</template>
<script>
export default {
  name:'FormItem',
  data () {
    console.log(this.formData)
    return{
      tableData:[{}]
    }
  },
  props:{
    formObj:{
      type:Array
    },
    formData:{
      type:Object
    },
    proxyOptions:{
      type:Object
    }
  }
}
</script>