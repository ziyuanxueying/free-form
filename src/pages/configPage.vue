<template>
  <div class="nxf-layout">
    <div class="nxf-layout-left">
      <Items/>
      23
    </div>
    <div class="nxf-layout-center">
      <Content/>
    </div>
    <div class="nxf-layout-right">
      <Setting/>
    </div>
  </div>
</template>
<script>
import Items from '../components/configs/items.vue'
import Content from '../components/configs/content.vue'
import Setting from '../components/configs/setting/index.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ConfigPage',
  components:{
    Items,
    Content,
    Setting
  },
})
</script>
