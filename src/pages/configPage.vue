<template>
  <div class="nxf-layout">
    <div class="nxf-layout-left">
      <Items/>
      <div :class="formConfig.isPreview?'stop-view':''"/>
    </div>
    <div class="nxf-layout-center">
      <Content/>
    </div>
    <div class="nxf-layout-right">
      <Setting/>
      <div :class="formConfig.isPreview?'stop-view':''"/>
    </div>
  </div>
</template>
<script>
import Items from '../components/configs/items.vue'
import Content from '../components/configs/content.vue'
import Setting from '../components/configs/setting/index.vue'
import { defineComponent } from 'vue'
import { useFormConfigStore } from '../store'

export default defineComponent({
  name: 'ConfigPage',
  components:{
    Items,
    Content,
    Setting
  },
  setup () {
    const formConfig  = useFormConfigStore()
    return { formConfig, }
  },
})
</script>
