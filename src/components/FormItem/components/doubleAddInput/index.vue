<template>
  <div style="margin-top: 10px;" v-if="!form.remote">
    <a-form-item
      :field="fileId+index"
      :label="label+(index+1)"
      v-for="(item,index) in form[fileId]"
      :key="index"
    >
      <a-input-number
        :placeholder="placeholderLeft||'请输入key'"
        allow-clear
        v-model="item.key"
      />
      <a-input-number
        :placeholder="placeholderRight||'请输入value'"
        allow-clear
        v-model="item.value"
      />
      <a-button type="outline" @click="()=>del(form[fileId],index)">
        <icon-delete/>
      </a-button>
    </a-form-item>
    <a-button type="outline" style="width: 100%;" @click="()=>add(form[fileId])">
      <IconPlus/>
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
    },
    remote:{
      type:Boolean
    },
    placeholderLeft:{
      type:String,
      default () {
        return '请输入key'
      }
    },
    placeholderRight:{
      type:String,
      default () {
        return '请输入value'
      }
    }
  },
  setup () {
    const add = (arr)=>{
      arr.push({
        value: '',
        key: '',
        id:Math.random()
      })
    }
    const del = (arr,index)=>{
      console.log(index)
      arr.splice(index, 1)
    }
    return {
      add,
      del
    }
  }
}
</script>