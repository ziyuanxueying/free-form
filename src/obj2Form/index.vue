<template>
  <div class="nx-form">
    <a-form :model="formData" class="nxf-layout-content-form">
      <FormItem :formObj="formObj"/>
    </a-form>
    {{ formData }}
  </div>
</template>
<script>
import { reactive } from 'vue-demi'
import { useFormConfigStore } from './../store'
// import { toRaw } from '@vue/reactivity'
import { getForm } from './utils'
import FormItem from './components/formItem.vue'
export default {
  components: {
    FormItem,
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