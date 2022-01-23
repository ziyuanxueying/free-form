<template>
  <div class="show-view">
    {{ formConfig.toJSON }}
    <a-form :model="form" class="nxf-layout-content-form">
      <a-form-item
        v-for="(item,index) in setList"
        :key="index"
        :field="item.fileId"
        :label="item.label"
        :required="item.required"
        :disabled="item.disabled"
        :validate-trigger="['change','input']"
      >
        <a-input
          :placeholder="item.placeholder"
          v-model="form[item.fileId]"
          allow-clear
        />
      </a-form-item>
    </a-form>
    {{ form }}
  </div>
</template>

<script>
import { reactive, toRefs, } from 'vue'
// import { useRoute } from 'vue-router'
import FormItem from '../components/FormItem'
import { useFormConfigStore } from '../store'
// import{ post } from '../tools/request'
import _ from 'lodash'
export default {
  components: {
    FormItem
  },
  data () { 
    return {

    }
  },
  setup () { 
    const formConfig  = useFormConfigStore()
    const state = reactive({ 
      form:{},
      setList : _.cloneDeep(formConfig.formItemList)
    })
    state.setList.map(item=>{
      _.merge(item, item.configList)
      console.log('item: ', item)
      delete item.configList
      if(item.defaultVal) {
        console.log(item.defaultVal)
        state.form[item.fileId] = item.defaultVal
      }
      return item
    })
    // const route = useRoute()
    // console.log(route.query)
    // const initJson = async ()=>{
    //   let res = await post(`/formDef/get/${route.query.id}`)
    //   formConfig.initJson(res.formDefJson)
    // }
    // if(route.query.id) {
    //   initJson()
    // }
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
.show-view {
  margin: 20px auto;
  width: 600px;
}
</style>