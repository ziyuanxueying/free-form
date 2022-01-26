<template>
  <div class="show-view">
    <Preview :formTag="form" :configList="setList"/>
    {{ form }}
  </div>
</template>

<script>
import { reactive, toRefs, } from 'vue'
// import { useRoute } from 'vue-router'
import FormItem from '../components/FormItem'
import { useFormConfigStore } from '../store'
import Preview from './componemts/preview.vue'
// import{ post } from '../tools/request'
import _ from 'lodash'
export default {
  components: {
    FormItem,
    Preview
  },
  data () { 
    return {

    }
  },
  setup () { 
    const formConfig  = useFormConfigStore()
    const state = reactive({ 
      form:{},
      setList : _.cloneDeep(formConfig.formItemList),
      layout:['NxTable','NxCard','NxGrid'],
    })
    // state.setList.map(item=>{
    //   _.merge(item, item.configList)
    //   delete item.configList
    //   if(state.layout.includes(item.name)) {
    //     _.merge(item, item.layout)
    //     delete item.layout
    //     state.form[item.fileId] = {}
    //   } 
    //   console.log('form: ', state.form)
    //   if(item.defaultVal) {
    //     console.log(item.defaultVal)
    //     state.form[item.fileId] = item.defaultVal
    //   }
      
    //   return item
    // })

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