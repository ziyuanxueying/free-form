<template>
  <a-button type="primary" style="margin-bottom:10px" @click="showInforBase=true">
    设置读写信息库
  </a-button>
  <InforBase @closeInforBase="closeInforBase" v-if="showInforBase"/>
  <a-radio-group class="set-view" v-model="settingType" type="button">
    <a-radio value="item">
      组件设置
    </a-radio>
    <a-radio value="form">
      表单设置
    </a-radio>
  </a-radio-group>
  <Setting v-show="settingType==='item'"/>
  <SetForm v-show="settingType==='form'"/>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Setting from './setItem'
import SetForm from './setForm'
import InforBase from './components/inforBase.vue'
export default {
  components:{
    Setting,
    SetForm,
    InforBase
  },
  data () { 
    return {
      settingType:'item'
    }
  },
  setup () { 
    const state = reactive({
      showInforBase:false
    })
    function closeInforBase () {
      state.showInforBase = false
    }
    return {
      ...toRefs(state),
      closeInforBase
    }
  },
  mounted () {
  },
  methods:{

  },
}
</script>

<style lang="less" scoped>
.set-view {
  margin-bottom: 20px;
  width: 100%;

  :deep(.arco-radio-button) {
    display: inline-block;
    width: 100%;
    text-align: center;
    line-height: 30px;
  }
}

</style>