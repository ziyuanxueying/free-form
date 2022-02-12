<template>
  <div v-if="item.configList.layout.ifAdd" v-show="!hide" class="card-view">
    <div
      class="card-item"
      v-for="(ditem,dindex) in formData[item.configList.layout.fileId]"
      :key="dindex"
    >
      <div class="flex-row">
        <div class="form-view">
          <FormItem
            v-for="(ccitem,ccindex) in item.configList.layout.colContent[0]"
            :item="ccitem"
            :key="ccindex"
            :formData="ditem"
            :proxyOptions="proxyOptions"
            :pathSetObj="pathSetObj"
            :ifRequired="ifRequired||(pathSetObj[id]?.required?required:(item.configList.required||false))"
            :ifDisabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))"
            :id="ccitem.configList.fileId||ccitem.componentId"
          />
        </div>
        <a-button
          :style="!dindex&&'visibility:hidden'"
          type="outline"
          status="danger"
          shape="circle"
          @click="cardDelete(dindex)"
        >
          <icon-delete/>
        </a-button>
      </div>
    </div>
    <a-button
      v-if="item.configList.layout.ifAdd"
      class="add-btn"
      type="outline"
      @click="cardAdd"
    >
      添加
    </a-button>
  </div>
  <template v-else>
    <div v-show="!hide">
      <FormItem
        v-for="(ccitem,ccindex) in item.configList.layout.colContent[0]"
        :item="ccitem"
        :key="ccindex"
        :formData="formData"
        :proxyOptions="proxyOptions"
        :pathSetObj="pathSetObj"
        :ifRequired="ifRequired||(pathSetObj[id]?.required?required:(item.configList.required||false))"
        :ifDisabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))"
        :id="ccitem.configList.fileId||ccitem.componentId"
      />
    </div>
  </template>
</template>

<script>
import { reactive,  toRefs, } from 'vue'
export default {
  data () { 
    return {

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
</style>