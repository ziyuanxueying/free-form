<template>
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
export default {
  components:{
    Setting,
    SetForm
  },
  data () { 
    return {
      settingType:'item'
    }
  },
  setup () { 
    const state = reactive({ })
    return {
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