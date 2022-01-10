<template>
  <div class="nxf-layout">
    <div class="nxf-layout-left">
      <Items/>
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
import Items from '@/components/configs/items.vue'
import Content from '@/components/configs/content.vue'
import Setting from '@/components/configs/setting.vue'
export default {
  components:{
    Items,
    Content,
    Setting
  },
}
</script>
