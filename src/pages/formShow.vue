<template>
  <div class="show-view">
    <!-- <Preview :form="form" :configList="setList"/> -->
  </div>
</template>

<script>
import { reactive, toRefs, } from 'vue'
import FormItem from '../components/FormItem'
import { useFormConfigStore } from '../store'
import Preview from './componemts/preview.vue'
import _ from 'lodash'
import { getForm } from '../utils'
export default {
  components: {
    FormItem,
    Preview
  },
  setup () { 
    const formConfig  = useFormConfigStore()
    const state = reactive({ 
      setList : _.cloneDeep(formConfig.formItemList),
    })
    let form = getForm(state.setList)
    console.log(11111111111111,form)
    return {
      formConfig,
      form,
      ...toRefs(state),
    }
  }
}
</script>

<style lang="less" scoped>
.show-view {
  margin: 20px auto;
  width: 600px;
}
</style>