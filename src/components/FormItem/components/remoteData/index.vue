<template>
  <div v-if="form.remote">
    <a-form-item
      :field="fileId"
      :label="label"
    >
      <a-input
        placeholder="请输入key"
        allow-clear
        v-model="form.keys.key"
      />
      <a-input
        placeholder="请输入value"
        allow-clear
        v-model="form.keys.value"
      />
    </a-form-item>
    <a-form-item
      field="remoteUrl"
      label="请求地址"
    >
      <a-input
        placeholder="请输入远程URL地址"
        v-model="form.remoteUrl"
        allow-clear
      />
    </a-form-item>
    <a-form-item
      field="remotePath"
      label="数据路径"
    >
      <a-input
        placeholder="请输入数据路径"
        v-model="form.remotePath"
        allow-clear
      />
    </a-form-item>
  </div>
</template>
<script>
import{ get } from '../../../../tools/request'
export default {
  name: 'NxRemoteData',
  nameCN: '远程数据',
  props:{
    fileId: {
      type: null,
    },
    label: {
      type: String,
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