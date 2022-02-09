<template>
  <a-form :model="formTag" class="nxf-layout-content-form form-show">
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
        <a-typography-paragraph :style="`width: 100%; text-align:${item.position};`">
          {{ item.defaultVal }}
        </a-typography-paragraph>
      </a-form-item>
      <template v-else-if="item.type=== 'NxCard'">
        <div v-for="(col,key) in item.colContent" :key="key">
          <ItemArr
            :configList="col"
            :fieldId="item.fieldId"
            :formTag="formTag[item.fileId][key]"
            :ifAdd="item.ifAdd"
            @addItem="addItem"
          />
        </div>
      </template>
    </template>
  </a-form>
</template>

<script>
import { reactive, toRefs,watch } from 'vue'
import _ from 'lodash'
import ItemArr from './itemArr.vue'
export default {
  name:'Preview',
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
    ifAdd:{
      type:Boolean
    },
    fieldId:{
      type:String
    },
  },
  components:{
    ItemArr,
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
    function initForm (list) {
      let arr = []
      arr =  list.map(item=>{
        _.merge(item, item.configList)
        delete item.configList
        console.log('item: ', item)
        if(item.name === 'NxCard') {
          _.merge(item, item.layout)
          delete item.layout
          let obj = {}
          item.colContent.forEach((citem)=>{
            let childArr =  initForm(citem)
            childArr.forEach((child)=>{
              obj[child.fileId] = child.defaultVal || null
            })
          })
          props.formTag[item.fileId] = [obj]
        } else {
          console.log('item: ', item)
          if(item.defaultVal) {
            console.log(item.defaultVal)
            props.formTag[item.fileId] = item.defaultVal
          }
        }
     
        return item
      })
      return arr
    }
    initForm(state.setList)
    // state.setList.map(item=>{
    //   _.merge(item, item.configList)
    //   delete item.configList
    //   if(item.name === 'NxCard') {
    //     _.merge(item, item.layout)
    //     delete item.layout
    //     let obj = {}
    //     item.colContent[0].forEach((citem)=>{
    //       console.log('citem: ',citem,)
    //       console.log('citem: ',JSON.stringify(citem))
    //       obj[citem.fileId] = undefined
    //     //   let cForm = getForm(citem)
    //     //   Object.assign(obj,cForm)
    //     })

    //     console.log('obj: ', obj)
    //     props.formTag[item.fileId] = [obj]
    //   } 
     
    //   if(item.defaultVal) {
    //     console.log(item.defaultVal)
    //     props.formTag[item.fileId] = item.defaultVal
    //   }
    //   return item
    // })
    console.log(' state.setList: ',  state.setList)

    function addItem (configList,fieldId) {
      let layout = _.find(state.setList, { 'fieldId': fieldId })
      layout.colContent.push(configList)
      props.formTag[layout.fileId].push({})
    }

    watch(()=>props.form,()=>{
      console.log('props.form: ', props.form)
    },{
      deep:true
    }
    )
    
    return {
      ...toRefs(state),
      //   addClick,
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