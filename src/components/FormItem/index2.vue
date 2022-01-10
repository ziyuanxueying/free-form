<template>
  {{ element.type }}
</template>
<script>
import { ref } from '@vue/reactivity'
import { getAllComponents } from '@utils'
import { watch } from '@vue/runtime-core'
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
    let item = ref(null)
    item = components[props.element.type] || null
    watch(()=>props.element,()=>{
      item = components[props.element.type] || null
    },{
      deep:true
    }
    )
    return {
      item
    }
  },
}
</script>