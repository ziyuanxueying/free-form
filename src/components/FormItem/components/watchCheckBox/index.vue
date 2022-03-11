<template>
  <a-form-item
    :field="fileId"
    :label="label"
  >
    <a-space direction="vertical" size="large">
      <a-checkbox-group v-model="form[proto]">
        <a-checkbox v-for="(item,index) in option" :key="index" :value="item.key">
          {{ item.value }}
        </a-checkbox>
      </a-checkbox-group>
    </a-space>
  </a-form-item>
</template>
<script>
import { watch,ref } from 'vue'
export default {
  name: 'NxWatchCheckbox',
  props: {
    fileId: { type: null, },
    label: { type: String, },
    proto:{ type: String, },
    form:{
      type:Object,
      default () {
        return null
      }
    },
  },
  setup (props) {
    let option = ref([])
    watch(()=>props.form.columns,()=>{
      option.value = props.form.columns
    },{
      deep:true,
      immediate:true
    })
    return {
      option
    }
  }
}
</script>