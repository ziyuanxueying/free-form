<template>
  <div>
    <a-form :model="form" :label-col-props="{ span: 8 }" :wrapper-col-props="{span: 16}">
      <FormItem
        :element="item"
        :form="form"
        v-for="(item) in setting"
        :key="item.id"
        pageFrom="setting"
      />
    </a-form>
  </div>
</template>
<script>
import { useFormConfigStore } from '../store'
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import FormItem from '../../FormItem'
import settingObj from '@/itemSetting'
import { getComponentsObj } from '@utils'
import setForm from './setForm.js'

export default {
  components: { FormItem },
  setup () {
    const formConfig = useFormConfigStore()
    let setting = ref([])
    let form = ref({})
    console.log(setForm)
    const init = ()=>{
      setForm.forEach(item=>{
        item.id = Math.random()
      })
      setting.value = setForm
    }
    init()
    const getFormSeting = (item)=>{
      formConfig.element = item
      if(item.configList.layout) {
        form.value = item.configList.layout
      }else{
        form.value = item.configList
      }
      let _s = settingObj[item.type] || []
      _s.forEach(item=>{
        item.id = Math.random()
      })
      //组件配置
      setting.value = _s
    }
    watch(()=>formConfig.fieldId,()=>{
    //获取当前选中组件的唯一id
      const fieldId = formConfig.fieldId
      const formItemList = formConfig.formItemList
      //通过id获取组件配置及属性值
      let res = getComponentsObj(formItemList,fieldId)
      if(res) {
        getFormSeting(res.obj)
      }
    })
    return {
      setting,
      init,
      form
    }
  },
}
</script>