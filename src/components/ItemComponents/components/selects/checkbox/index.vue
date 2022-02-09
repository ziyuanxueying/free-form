<template>
  <a-form-item
    :field="fileId"
    :label="label"
    :required="required"
    :hideLabel="hideLabel"
    :disabled="disabled"
  >
    {{ columns }}
    <a-space direction="vertical" size="large">
      <a-checkbox-group>
        <a-checkbox value="1">
          Option 1
        </a-checkbox>
        <a-checkbox value="2">
          Option 2
        </a-checkbox>
      </a-checkbox-group>
    </a-space>
  </a-form-item>
</template>
<script>
export { default as setting } from './setting'
import { watch } from 'vue'
export default {
  name: 'NxCheckbox',
  nameCN: '复选框组',
  icon:'icon-calendar',
  props: {
    fileId: { type: null, },
    label: { type: String, },
    // defaultVal:{ type: String, },
    required:{ type: Boolean, },
    hideLabel:{ type: Boolean, },
    disabled:{ type: Boolean, },
    columns:{ type: Object },
    remote:{ type: Boolean },
    proto:{ type: String, },
    form:{
      type:Object,
      default () {
        return null
      }
    },
  },
  setup (props) {
    console.log('props: ', props)
    watch(()=>props.columns,()=>{
      console.log(props)
      let colCount = props.columns.length
      console.log('colCount: ', colCount)
    },{
      deep:true
    })
  }
}
</script>