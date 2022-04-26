<template>
  <div class="flex-between" style="margin-bottom: 10px;">
    <a-button type="text" @click="clickCheck('showInforBase')">
      <icon-edit/>
      设置读写信息库
    </a-button>
    <a-button type="text" class="link-btn" @click="clickCheck('linkShow')">
      <icon-plus/>
      关联模板设置
    </a-button>
  </div>
  <InforBase @closeInforBase="closeInforBase" v-if="showInforBase"/>
  <RelationSet v-model:linkShow="linkShow"/>
  <div class="line-view"/>
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
import { useFormConfigStore } from '../../../store'
import { checkOnly } from '../../../utils/index'
export default {
  components:{
    Setting,
    SetForm,
    InforBase,
    RelationSet,
  },
  setup () { 
    const config = useFormConfigStore()
    const state = reactive({
      showInforBase:false,
      settingType:'item',
      linkShow:false,
    })

    function clickCheck (type) {
      if (!checkOnly(config.formItemList)) return
      state[type] = true
    }

    function closeInforBase () {
      state.showInforBase = false
    }
    return {
      ...toRefs(state),
      closeInforBase,
      clickCheck,
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
  margin-bottom: 10px;
  width: 100%;

  :deep(.arco-radio-button) {
    display: inline-block;
    width: 100%;
    text-align: center;
    line-height: 30px;
  }
}

.link-btn {
  margin-left: -10px;
}

.line-view {
  margin: 0 -20px 20px;
  height: 10px;
  background: #f7f8fa;
}
</style>