<template>
  <div class="nx-form-setting">
    <div class="nx-form-setting-base">
      <div class="nx-form-setting-title">
        基础设置
      </div>
      <a-form :model="form" :label-col-props="{ span: 8 }" :wrapper-col-props="{span: 16}">
        <FormItem
          :element="item"
          :form="form"
          v-for="(item) in setting"
          :key="item.id"
          pageFrom="setform"
        />
      </a-form>
    </div>
    <div class="nx-form-setting-advance">
      <div class="nx-form-setting-title">
        高级设置
      </div>
      <AdvancedSetting/>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import FormItem from '../../../FormItem'
import setForm from './baseSetting.js'
import AdvancedSetting from './advancedSetting'

export default {
  components: { 
    FormItem,
    AdvancedSetting 
  },
  setup () {
    let setting = ref([])
    let form = ref({})
    const init = ()=>{
      setForm.forEach(item=>{ item.id = Math.random() })
      setting.value = setForm
    }
    init()
    return {
      setting,
      init,
      form
    }
  },
}
</script>