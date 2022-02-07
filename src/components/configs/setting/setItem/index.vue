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
import { useFormConfigStore } from '../../../../store'
import { ref,watch } from 'vue'
import FormItem from '../../../FormItem'
import settingObj from '../../../../itemSetting'
import { getComponentsObj } from '../../../../utils'
import { defineComponent, } from 'vue'
export default defineComponent({
  components: { FormItem },
  setup () {
    const formConfig = useFormConfigStore()
    let setting = ref([])
    let form = ref({})
    const getFormSeting = (item)=>{
      formConfig.element = item
      if(item.configList.layout) {
        form.value = item.configList.layout
      }else{
        form.value = item.configList
      }
      let set = settingObj[item.type] || []
      set.forEach(item=>{
        item.id = Math.random()
      })
      //组件配置
      setting.value = set
    }
    watch(()=>formConfig.componentId,()=>{
    //获取当前选中组件的唯一id
      const componentId = formConfig.componentId
      const formItemList = formConfig.formItemList
      //通过id获取组件配置及属性值
      let res = getComponentsObj(formItemList,componentId)
      if(res) {
        getFormSeting(res.obj)
      }
    })
    return {
      setting,
      form
    }
  },
})
</script>