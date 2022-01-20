<template>
  <div v-if="form.remote">
    <a-form-item
      :field="fileId+index"
      :label="label+index"
      v-for="(item,index) in form[fileId]"
      :key="index"
    >
      <a-input
        placeholder="请输入key"
        allow-clear
        v-model="item.key"
      />
      <a-input
        placeholder="请输入value"
        allow-clear
        v-model="item.value"
      />
    </a-form-item>
    <!-- <a-button type="outline" style="width: 100%;" @click="()=>add(form[fileId])">
      添加222
    </a-button> -->
    <a-button type="outline" style="width: 100%;" @click="getData">
      获取数据
    </a-button>
  </div>
</template>
<script>
import{ get } from '@request'
export default {
  name: 'NxRemoteData',
  nameCN: '远程数据',
  props:{
    fileId: {
      type: null,
      default: 'doubleInput'
    },
    label: {
      type: String,
      default: '输入框'
    },
    form:{
      type:Object, 
      default () {
        return null
      }
    },
    columns:{
      type:Object,
      default () {
        return null
      }
    },
    colContent:{
      type:Array
    },
    remote:{
      type:Boolean
    },
  },
  setup () {
    const getData = async ()=>{
      let data =  await get('https://api.apiopen.top/videoHomeTab')
      console.log('data: ', data)
    }
    const add = (arr)=>{
      arr.push({
        value: '',
        key: '',
      })
    }
    return { 
      getData,
      add
    }
  }
}
</script>