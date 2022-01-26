<template>
  <template
    v-for="(item,index) in setList"
    :key="index"
  >
    <a-form-item
      v-if="!layout.includes(item.type)"
      :field="item.fileId"
      :label="item.label"
      :required="item.required"
      :disabled="item.disabled"
      :validate-trigger="['change','input']"
    >
      <a-input
        v-if="item.type=== 'NxInput'"
        :placeholder="item.placeholder"
        v-model="formTag[item.fileId]"
        allow-clear
      />
      <a-input-number
        v-if="item.type=== 'NxInputNum'"
        :placeholder="item.placeholder"
        v-model="formTag[item.fileId]"
        allow-clear
        :min="item.min" 
        :max="item.max"
      />
    </a-form-item>
  </template>
  <a-button type="outline" v-if="ifAdd" @click="addClick">
    添加
  </a-button>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
import Preview from './preview.vue'
import _ from 'lodash'
export default {
  name:'ItemArr',
  emits: ['addItem'],
  props:{
    formTag:{
      type:Object,
      default () {
        return {}
      }
    },
    configList:{
      type:Array,
      default () {
        return []
      }
    },
    colContent:{
      type:Array,
      default () {
        return []
      }
    },
    ifAdd:{
      type:Boolean
    },
    fieldId:{
      type:String
    },
  },
  components:{
    Preview,
  },
  data () { 
    return {

    }
  },
  setup (props,ctx) { 
    const state = reactive({ 
      layout: ['NxTable','NxCard','NxGrid'],
      setList: props.configList,
      formArr: props.colContent,
    })
    console.log('formArr: ', state.colContent)
    function addClick () {
      console.log('add',props.fieldId)
      ctx.emit('addItem', props.configList, props.fieldId)
    }

    function addItem (configList,fieldId) {
      let aa = _.find(state.setList, { 'fieldId': fieldId })
      aa.colContent.push(configList)
      console.log('aa: ', aa)
      console.log('fieldId: ', fieldId)
      console.log('setList=',state.setList)
      console.log('addItem',configList)
    }

    watch(()=>props.configList,()=>{
      console.log('watch: ', props.configList)
      console.log('watch: ', props.setList)
    },{
      deep:true
    }
    )
    return {
      ...toRefs(state),
      addClick,
      addItem,
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