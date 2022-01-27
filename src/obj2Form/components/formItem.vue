<template>
  <span>
    <a-form-item
      :field="item.configList.fileId"
      :label="item.configList.label"
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
    </a-form-item>
  </span>
</template>
<script>
export default {
  props:{
    formObj:{
      type:Array
    }
  }
}
</script>