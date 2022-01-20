<template>
  <div>
    <a-form :model="formConfig.formSet" class="nxf-layout-content-form">
      <FormItem
        v-for="(element,index) in formConfig.formItemList "
        :element="element"
        :key="index"
        pageFrom="show"
      />
    </a-form>
  </div>
</template>

<script>
import { reactive, toRefs, } from 'vue'
import { useRoute } from 'vue-router'
import FormItem from '../components/FormItem'
import { useFormConfigStore } from '@store'
import{ post } from '@request'
export default {
  components: {
    FormItem
  },
  data () { 
    return {

    }
  },
  setup () { 
    const state = reactive({ })
    const formConfig  = useFormConfigStore()
    const route = useRoute()
    console.log(route.query)
    const initJson = async ()=>{
      let res = await post(`/formDef/get/${route.query.id}`)
      formConfig.initJson(res.formDefJson)
    }
    if(route.query.id) {
      initJson()
    }
    return {
      formConfig,
      ...toRefs(state),
    }
  },
  mounted () {
  },
  methods:{

  },
}
</script>

<style lang="less" scoped>
</style>