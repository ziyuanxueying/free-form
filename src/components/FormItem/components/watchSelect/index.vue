<template>
  <a-form-item
    :field="fileId"
    :label="label"
  >
    <a-select v-model="form[proto]">
      <a-option
        v-for="(item) in option"
        :key="item.id"
        :value="item.key"
        :label="item.value"
      />
    </a-select>
  </a-form-item>
</template>
<script>
import { watch,ref } from 'vue'
export default {
  name: 'NXWatchSelect',
  props: {
    fileId: {
      type: null,
      default: 'select'
    },
    label: {
      type: String,
      default: '下拉框'
    },
    pageFrom:{ type: String, },
    form:{
      type:Object,
      default () {
        return null
      }
    },
    proto:{  //绑定的key
      type: String,
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