<template>
  <div>
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
</template>
<script>
import { ref } from '@vue/reactivity'
import FormItem from '../../FormItem'
import setForm from './setForm.js'

export default {
  components: { FormItem },
  setup () {
    let setting = ref([])
    let form = ref({})
    console.log(setForm)
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