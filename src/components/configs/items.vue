<template>
  <div>
    <div class="nxf-h1">
      组件
    </div>
    <div class="nxf-layout-item" v-for="(item,index) in itemList" :key="index">
      <div class="nxf-layout-item-title">
        {{ item.name }}
      </div>
      <div class="nxf-layout-item-content">
        <draggable
          v-model="item.components"
          :group="{ name: 'NXFormGroup', pull: 'clone', put: false }"
          :sort="false"
          :clone="clone"
          item-key="name"
          class="nxf-layout-item-content-draggable"
        >
          <template #item="{element}">
            <div class="nxf-component-card">
              <component
                class="menu-icon"
                :is="element.icon"
              /> 
              {{ element.moduleName }}
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import { ref } from '@vue/reactivity'
import ItemComponents from '../ItemComponents'
import _ from 'lodash'

export default {
  components: {
    draggable,
  },
  setup () {
    let itemList = ref(ItemComponents)
    console.log('itemList: ', itemList)
    return {
      itemList
    }
  },
  methods: {
    clone (obj) {
      const newObj = Object.assign(_.cloneDeep(obj), { componentId: `${obj.name}_${new Date().getTime()}` })
      return newObj
    }
  }
}
</script>