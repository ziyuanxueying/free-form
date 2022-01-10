<template>
  <div>
    <a-form :model="form" :label-col-props="{ span: 8 }" :wrapper-col-props="{span: 16}">
      <FormItem
        :element="item"
        v-for="(item,index) in setting"
        :key="index"
        :form="form"
      />
    </a-form>
  </div>
</template>
<script>
import { useFormConfigStore } from './store'
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import FormItem from '../FormItem'
import settingObj from '@/itemSetting'
export default {
  components: {
    FormItem
  },
  setup () {
    const formConfig = useFormConfigStore()
    let setting = ref([])
    let form = ref({})
    const getFomeSeting = (arr,fieldId) =>{
      arr.forEach(item=>{
        if(item.fieldId === fieldId) {
          //组件属性值
          if(item.configList.layout) {
            form.value = item.configList.layout
          }else{
            form.value = item.configList
          }
          //组件配置
          setting.value = settingObj[item.type] || []
          return 
        }
        else{
          if(item.configList.layout) {
            item.configList.layout.colContent.forEach(childItem=>{
              getFomeSeting(childItem,fieldId)
            })  
          }
        }
      })
    }
    watch(()=>formConfig.fieldId,()=>{
    //获取当前选中组件的唯一id
      const fieldId = formConfig.fieldId
      const formItemList = formConfig.formItemList
      //通过id获取组件配置及属性值
      getFomeSeting(formItemList,fieldId)
    })
    return {
      setting,
      form
    }
  },
}
</script>