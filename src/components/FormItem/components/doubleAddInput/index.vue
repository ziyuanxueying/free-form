<template>
  <div>
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
    {{ form }}
    <a-button type="outline" style="width: 100%;" @click="()=>add(form[fileId])">
      添加
    </a-button>
  </div>
</template>
<script>
export default {
  name: 'NxDoubleInput',
  nameCN: '自增输入框',
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
    }
  },
  setup () {
    const add = (arr)=>{
      console.log('arr: ', arr)
      arr.push({
        value: 'Name',
        key: 'name',
      })
    }
    return {
      add
    }
  }
}
</script>