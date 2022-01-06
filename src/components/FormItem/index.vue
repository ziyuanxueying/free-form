<template>
  <component :is="item" v-bind="element.configList" :form="form"/>
</template>
<script>
import { getAllComponents } from '@utils'
// import { computed } from 'vue-demi'
export default {
  props:{
    element:{
      type:Object,
      default () {
        return{}
      }
    },
    form:{
      type:Object,
      default () {
        return {}
      }
    }
  },
  setup (props) {
    let components = getAllComponents()
    let item = components[props.element.type] || null
    return {
      item
    }
  },
}
</script>