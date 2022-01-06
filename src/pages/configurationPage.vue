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
import Items from '@/components/configurationPage/items.vue'
import Content from '@/components/configurationPage/content.vue'
import Setting from '@/components/configurationPage/setting.vue'
export default {
  components:{
    Items,
    Content,
    Setting
  },
}
</script>
