<template>
  <a-button type="primary" style="margin-bottom: 10px;" @click="showInforBase=true">
    设置读写信息库
  </a-button>
  <a-button type="primary" class="link-btn" @click="linkShow=true">
    关联模板设置
  </a-button>
  <InforBase @closeInforBase="closeInforBase" v-if="showInforBase"/>
  <RelationSet v-model:linkShow="linkShow"/>
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
import RelationSet from './components/relationSet.vue'
export default {
  components:{
    Setting,
    SetForm,
    InforBase,
    RelationSet,
  },
  setup () { 
    const state = reactive({
      showInforBase:false,
      settingType:'item',
      linkShow:true,
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

.link-btn {
  margin-left: 10px;
}
</style>