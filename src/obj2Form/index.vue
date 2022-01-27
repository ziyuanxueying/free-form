<template>
  <div class="nx-form">
    <a-form :model="formData" class="nxf-layout-content-form">
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
    </a-form>
    {{ formData }}
  </div>
</template>
<script>
import { reactive } from 'vue-demi'
import { useFormConfigStore } from './../store'
// import { toRaw } from '@vue/reactivity'
import { getForm } from './utils'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
export default {
  components: {
    VueJsonPretty,
  },
  setup () {
    let formObj = reactive({})
    let proxyOptions = reactive({})
    let formData,formOptions
    async function getFormObj () {
      formObj = useFormConfigStore().formItemList
      //获取表单解构及所有原始options对象
      let form = getForm(formObj,{})
      //为表单数据添加响应
      formData = reactive(form.form)
      formOptions = form.options
      //解析原始options对象为可用options数组对象
      for(let p in formOptions) {
        try{
          proxyOptions[p] = await getOptions(formOptions[p])
        }
        catch(e) {
          proxyOptions[p] = []
        }
      }
    }
    async function getOptions (oldOptions) {
      if(!Array.isArray(oldOptions)) {
        try{
          //执行远程方法
          let res = await oldOptions.fnc()
          //根据路径解构数据
          let arr = res[oldOptions.remotePath].map(item=>{
            //重新定义option prop
            return {
              value:item[oldOptions.value],
              key:item[oldOptions.key]
            }
          })
          return arr
        }
        catch(e) {
          return []
        }
      }else{
        return oldOptions
      }
    }
    getFormObj()
    return {
      formObj,
      formData,
      formOptions,
      getOptions,
      proxyOptions
    }
  },
}
</script>