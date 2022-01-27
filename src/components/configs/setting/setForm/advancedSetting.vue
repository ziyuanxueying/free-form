<template>
  <div>
    <a-button type="primary" @click="modalAct(true)">
      流程设置
    </a-button>
    <PathSettingModal v-if="visible" @close="modalAct(false)"/>
  </div>
</template>
<script>
import PathSettingModal from './components/pathSettingModal.vue'
import { ref } from 'vue'
export default {
  components:{
    PathSettingModal
  },
  setup () {
    let visible = ref(false)
    function modalAct (bol) {
      visible.value = bol
    }
    return{
      modalAct,
      visible
    }
  }
}
</script>