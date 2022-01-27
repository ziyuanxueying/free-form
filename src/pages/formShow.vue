<template>
  <div>
    <a-form :model="formConfig.formSet" class="nxf-layout-content-form preview-form">
      <FormItem
        v-for="(element,index) in formConfig.formItemList "
        :element="element"
        :key="index"
        pageFrom="show"
      />
      <div class="flex-between">
        <a-button type="outline">
          保存
        </a-button>   
        <a-button type="outline" @click="checkJson ">
          查看格式
        </a-button>
      </div>
    </a-form>

    <a-modal
      :width="600"
      v-model:visible="visible"
      title="查看格式"
    >
      <a-typography>
        {{ jsonForm }}
      </a-typography>
    </a-modal>
  </div>
</template>

<script>
import { reactive, toRefs, defineComponent } from 'vue'
// import { useRoute } from 'vue-router'
import FormItem from '../components/FormItem'
import { useFormConfigStore } from '../store'
// import{ post } from '../tools/request'
import{ getForm } from '../utils'
export default defineComponent({
  name:'FormShow',
  components: {
    FormItem
  },
  data () { return { } },
  setup () { 
    const state = reactive({ visible: false, jsonForm:{} })
    const formConfig  = useFormConfigStore()
    // const route = useRoute()
    // console.log(route.query)
    // const initJson = async ()=>{
    //   let res = await post(`/formDef/get/${route.query.id}`)
    //   formConfig.initJson(res)
    // }
    // if(route.query.id) {
    //   initJson()
    // }
    function checkJson () {
      state.visible = true
      state.jsonForm = getForm(formConfig.formItemList)
    }
    return {
      formConfig,
      checkJson,
      ...toRefs(state),
    }
  },
  mounted () {
  },
  methods:{

  },
})
</script>

<style lang="less" scoped>
.preview-form {
  margin: 20px auto;
  width: 600px;
}
</style>