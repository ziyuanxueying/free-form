<template>
  <a-form :model="formTag" class="nxf-layout-content-form form-show">
    <template
      v-for="(item,index) in configList"
      :key="index"
    >
      {{ item }}
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
        <a-typography-paragraph :style="`width: 100%; text-align:${item.position};`">
          {{ item.defaultContent }}
        </a-typography-paragraph>
      </a-form-item>

      <Preview
        v-else
        :formTag="formTag[item.fileId]"
        :configList="item.colContent[0]"
        :ifAdd="item.ifAdd"
      />
     
      <!-- <div v-else>
        {{ item }}
      </div> -->
    </template>
    <a-button type="outline" v-if="ifAdd" @click="addItem">
      添加
    </a-button>
  </a-form>
</template>

<script>
import { reactive, toRefs,watch } from 'vue'
import _ from 'lodash'
export default {
  name:'Preview',
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
  },
  data () { 
    return {

    }
  },
  setup (props) { 
    console.log('props: ', props)
    const state = reactive({ 
      layout:['NxTable','NxCard','NxGrid'],
      setList:props.configList
    })
    console.log(props.configList)
    state.setList.map(item=>{
      _.merge(item, item.configList)
      delete item.configList
      if(item.name === 'NxCard') {
        _.merge(item, item.layout)
        delete item.layout
        props.formTag[item.fileId] = {}
        // item.colContent = item.colContent[0]
      } 
     
      if(item.defaultVal) {
        console.log(item.defaultVal)
        props.formTag[item.fileId] = item.defaultVal
      }
      return item
    })
    console.log(' state.setList: ',  state.setList)
    // if(){
    // }
    function addItem () {
      console.log('add',props.formTag)
    }

    watch(()=>props.form,()=>{
      console.log('props.form: ', props.form)
    },{
      deep:true
    }
    )
    
    return {
      ...toRefs(state),
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
.form-show {
  border: 1px dashed #ccc;
}
</style>