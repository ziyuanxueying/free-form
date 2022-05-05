<template>
  <a-form-item
    v-show="showItemHandler(item)" 
    :field="field&&id?`${field}${id}`:field||id"
    :label="item.configList.label|| item.moduleName"
    :disabled="disabledItemHandler(item)"
    :validate-trigger="['change','input']"
    :hideLabel="item.hideLabel"
    :rules="[{required:isRequired(),message:'请完善当前项'},] "
    :label-col-props="['NxGrid','NxTable'].includes(item.type)?{span:0}:{xs:20,lg:span?span:4}"
    :wrapper-col-props="['NxGrid','NxTable','NxOAInfo'].includes(item.type)?{span:24}:{xs:20,lg:span?(24-span):20}"
  >
    <a-input v-if="item.type=='NxInput'" v-model="formData[id]" :placeholder="disabledItemHandler(item)?'':item.configList.placeholder"/>
    <n-upload
      v-if="item.type=='NxUpload'"
      :default-files="deafultList"
      v-model:files="formData[id]"
      :limit="item.configList.maxCount"
      :state="['copy','edit'].includes($route.query.type) ? 'edit' :'detail'"
      @change="changeFileList(field&&id?`${field}${id}`:field||id)"
      :disabled="disabledItemHandler(item)"
    />
    <!-- <a-upload action="/" disabled v-if="item.type=='NxUpload'&&(ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false)))"/> -->
    <a-textarea
      v-if="item.type=='NxTextarea'"
      v-model="formData[id]"
      :placeholder="ifDisabled?'':item.configList.placeholder"
      :max-length="item.configList.maxLength"
      auto-size
    />
    <a-input-number
      v-else-if="item.type=='NxInputNum'"
      v-model="formData[id]"
      :placeholder="ifDisabled?'':item.configList.placeholder"
      :min="item.configList.min"
      :max="item.configList.max"
      :precision="item.configList.precision" 
    />
    <a-typography-paragraph v-if="item.type=='NxText'" :style="`width: 100%; text-align:${item.configList.position||'left'};`">
      {{ item.configList.defaultVal }}
    </a-typography-paragraph>
    <a-date-picker
      v-if="item.type=='NxDatePicker'"
      :placeholder="ifDisabled?' ':item.configList.placeholder"
      allow-clear
      v-model="formData[id]"
      :format="item.configList.format"
      :showTime="item.configList.showTime"
      :disabled="disabledItemHandler(item)"
    />
    <a-range-picker
      v-if="item.type=='NxRangePicker'"
      v-model="formData[id]"
      allow-clear
      :placeholder="ifDisabled?' ':''"
      :showTime="item.configList.showTime"
      :disabled="disabledItemHandler(item)"
    />
    <a-switch v-if="item.type=='NxSwitch'" v-model="formData[id]"/>
    <a-select
      v-if="item.type=='NxSelect'"
      v-model="formData[id]"
      :placeholder="ifDisabled?'':item.configList.placeholder"
      :multiple="item.configList.multiple"
    >
      <a-option v-for="(citem,index) in proxyOptions[id]" :key="index" :value="citem.key || citem.value">
        {{ citem.value }}
      </a-option>
    </a-select>
    <a-space v-if="item.type=='NxCheckbox'" direction="vertical" size="large">
      <a-checkbox-group v-model="formData[item.configList.fileId]" :disabled="disabledItemHandler(item)">
        <a-checkbox v-for="(citem,index) in proxyOptions[item.configList.fileId]" :key="index" :value="citem.key || citem.value">
          {{ citem.value }}
        </a-checkbox>
      </a-checkbox-group>
    </a-space>
    <a-row class="nxf-row" v-if="item.type=='NxGrid'" style="width: 100%;">
      <a-col
        v-for="(citem,cindex ) in item.configList.layout.colContent"
        :key="cindex"
        :xs="24"
        :sm="24"
        :md="12"
        :lg="{
          span:Array.isArray(item.configList.layout.colCount)?item.configList.layout.colCount[cindex].key:Math.floor(24 / item.configList.layout.colCount),
          offset:(Array.isArray(item.configList.layout.colCount)?item.configList.layout.colCount[cindex].value:0)}"
      >
        <FormItem
          v-for="(ccitem,ccindex) in citem"
          :item="ccitem"
          :formData="formData"
          :key="ccindex"
          :proxyOptions="proxyOptions"
          :pathSetObj="pathSetObj"
          :ifRequired="isRequired()"
          :ifDisabled="disabledItemHandler(item)"
          :id="ccitem.configList.fileId||ccitem.componentId"
          :field="field"
          :hidden="hide"
          :span="Array.isArray(item.configList.layout.colCount)? (24/item.configList.layout.colCount[cindex].key)*4:item.configList.layout.colCount*4"  
        />
      </a-col>
    </a-row>
    <a-table
      v-if="item.type=='NxTable'"
      :data="formData[item.configList.layout.fileId]"
      :columns="columns"
      :bordered="{wrapper: true, cell: true}"
      :pagination="false"
      style="width: 100%;"
    >
      <template #columns>
        <a-table-column
          v-for="(citem,index) in columns"
          :key="index"
          :title="citem.value"
          :data-index="citem.key"
          :width="citem.width"
          :align="citem.align?citem.align:''"
        >
          <template #cell="{ rowIndex }">
            <div class="nxf-table-td" v-for="(ccitem,ccindex) in item.configList.layout.colContent[index]" :key="ccindex">
              <FormItem
                :item="ccitem"
                :formData="formData[item.configList.layout.fileId][rowIndex]"
                :proxyOptions="proxyOptions"
                :pathSetObj="pathSetObj"
                :ifRequired="isRequired()"
                :ifDisabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))"
                :id="`${ccitem.configList.fileId||ccitem.componentId}`"
                :field="`${item.configList.layout.fileId}.${rowIndex}.`"
                :formRef="formRef"
                :hidden="hide"
              />
            </div>
            <div class="flex-row-center" v-if="citem.key === 'operate'">
              <a-button
                class="operate-btn"
                type="text"
                @click="tableAdd(rowIndex)"
              >
                添加
              </a-button>
              <a-button
                v-show="rowIndex"
                class="operate-btn"
                type="text"
                @click="cardDelete(rowIndex)"
              >
                删除
              </a-button>
            </div>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <itemOa
      v-if="['NxStaff','NxOAName','NxOADepart','NxOABank','NxOACity','NxOALinkForm'].includes(item.type)"
      :item="item"
      :formData="formData"
      :pathSetObj="pathSetObj"
      :proxyOptions="proxyOptions"
      :id="item.configList.fileId||item.componentId"
      :ifDisabled="ifDisabled"
    />
 
    <ItemOaInfo
      v-if="['NxOAInfo'].includes(item.type)"
      :item="item"
      :formData="formData"
      :pathSetObj="pathSetObj"
      :proxyOptions="proxyOptions"
      :id="item.configList.fileId||item.componentId"
      :ifDisabled="ifDisabled"
    />
  </a-form-item>
  <template v-if="item.type=== 'NxCard'&&item.opType!==2">
    <div v-if="item.configList.layout.ifAdd" v-show="!hide" class="card-view">
      <div
        class="card-item"
        v-for="(ditem,dindex) in formData[item.configList.layout.fileId]"
        :key="dindex"
      >
        <div class="flex-row">
          <div class="form-view">
            <FormItem
              v-for="(ccitem,ccindex) in item.configList.layout.colContent[0]"
              :item="ccitem"
              :key="ccindex"
              :formData="ditem"
              :proxyOptions="proxyOptions"
              :pathSetObj="pathSetObj"
              :ifRequired="isRequired()"
              :hidden="hide"
              :ifDisabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))"
              :id="ccitem.configList.fileId||ccitem.componentId"
              :formRef="formRef"
              :field="id.indexOf('NxGrid') === -1 ?`${item.configList.layout.fileId}.${dindex}.`:`${item.configList.layout.fileId}.${dindex}.${ccitem.configList.fileId||ccitem.componentId}`"
            />
          </div>
          <a-button
            v-if="!ifDisabled"
            :style="!dindex&&'visibility:hidden'"
            class="card-del"
            type="outline"
            status="danger"
            shape="circle"
            @click="cardDelete(dindex)"
          >
            <icon-delete/>
          </a-button>
        </div>
      </div>
      <a-button
        v-if="item.configList.layout.ifAdd && !ifDisabled"
        class="add-btn"
        type="outline"
        @click="cardAdd"
      >
        添加
      </a-button>
    </div>
    <template v-else>
      <div v-show="!hide">
        <FormItem
          v-for="(ccitem,ccindex) in item.configList.layout.colContent[0]"
          :item="ccitem"
          :key="ccindex"
          :formData="formData"
          :proxyOptions="proxyOptions"
          :pathSetObj="pathSetObj"
          :ifRequired="isRequired()"
          :hidden="hide"
          :ifDisabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))"
          :id="ccitem.configList.fileId||ccitem.componentId"
          :formRef="formRef"
        />
      </div>
    </template>
  </template>
</template>
<script>
import { reactive, toRefs, watch } from 'vue-demi'
import { useRoute } from 'vue-router'
import{ getForm } from '../utils'
import itemOa from './itemOa.vue'
import ItemOaInfo from './itemOaInfo.vue'
import { NUpload } from '@naxions/nax-common'
import { add,evaluate } from 'mathjs'
import _ from 'lodash'
import { useFormConfigStore } from '../../store'
export default {
  components:{ itemOa, NUpload,ItemOaInfo },
  name:'FormItem',
  setup (props) {
    const route = useRoute()
    const store = useFormConfigStore()
    const config = reactive({
      disabled:false,
      required:false,
      hide:false,
      columns:null,
      deafultList: [],
    })
    if(props.item.type === 'NxTable') {
      config.columns = [ ...props.item.configList.layout?.columns, ...[{ key:'operate',value:'操作',width:110 ,align:'center' }]]
    }
    if(props.item.type === 'NxDatePicker') {
      props.item.configList.showToday && (props.formData[props.id] = Date.now())
    }
    if(props.item.type === 'NxRangePicker') {
      props.item.configList.showToday && (props.formData[props.id] = [Date.now(),Date.now()])
    }
    const cardAdd = ()=> {
      let formCard = getForm(props.item.configList.layout.colContent[0],{})
      props.formData[props.item.configList.layout.fileId].push(formCard.form)
    }
    const tableAdd = (index)=> {
      let formCard = getForm([props.item],{})
      props.formData[props.item.configList.layout.fileId].splice(index + 1, 0, formCard.form[props.item.configList.layout.fileId][0])
    }
    const cardDelete = (dindex)=>{
      props.formData[props.item.configList.layout.fileId].splice(dindex,1)
    }
    const changeFileList = (id)=>{
      props.formRef.validateField(id)
    }
    const showItemHandler = (item)=>{
      // NxCard解析不在这个dom里面  opType（操作设置）为2时是隐藏
      return !config.hide && item.type !== 'NxCard' && item.opType !== 2
    }
    
    const disabledItemHandler = (item)=>{
      // 有opType取opType，没有的话增加默认值:编辑和复制时默认读写，其他默认只读
      item.opType =  item.opType !== undefined ? item.opType : ['copy','edit'].includes(route.query.type) ? 1 : 0
      // ifDisabled父级及以上被禁用 pathSetObj根据公式配置  configList表单设计的是否禁用选项 opType操作设置的配置为0时是只读选项
      return props.ifDisabled || (props.pathSetObj[props.id]?.disabled ? config.disabled : (item.configList.disabled || false)) || item.opType === 0
    }
    function isRequired () {
      if(props.hidden || props.item.opType === 2) {
        return false
      }
      return props.ifRequired || (props.pathSetObj[props.id]?.required ? config.required : (props.item.configList.required || false))
    }
    watch(()=>props.formData,()=>{
      //   if(props.item.type === 'NxUpload' && !config.deafultList.length) {
      if(props.item.type === 'NxUpload') {
        let val = JSON.stringify(props.formData[props.id] || [])
        if(val !== JSON.stringify(config.deafultList)) {
          config.deafultList = JSON.parse(val)
        }
      }
      if(props.item.type === 'NxInputNum')  { 
        props.formData[props.id] = Number(props.formData[props.id])
      }
      if(props.pathSetObj[props.id]) {
        let actArr = ['disabled','hide','required']
        actArr.forEach(item=>{
          let itemLink = props.pathSetObj[props.id][item]
          if(itemLink) {
            let type = itemLink.value === 'false' ? false : itemLink.value === 'true' ? true : itemLink.value
            if(itemLink.equation === 'equal') {
              // eslint-disable-next-line eqeqeq
              config[item] = props.formData[itemLink.parentProp] == type
            }else{
              // eslint-disable-next-line eqeqeq
              config[item] = props.formData[itemLink.parentProp] != type
            }
          }
        })
      }
    },{ deep: true, immediate:true })
     
    if(props.item?.relation?.relationTem === 0 || props.item?.relation?.relationCur) {
      const relation =  { ...props.item.relation }
      // 本表单关联本表函数
      if(relation.relationFuncId) {
        // 根据{} 拆解因子，拆成一个数组
        let array = relation.relationFuncId.match(/[^{]+(?=\})/g) 
        // 动态监听每个因子的变化
        for (let i = 0; i < array.length; i++) {
          watch(()=>props.formData[array[i]],()=>{
            let formula = relation.relationCur ? _.find(store.getRelComponents,['orgComponentId',relation.orgComponentId]).relationFuncId : relation.relationFuncId
            for (const formVal of array) {
              // 将因子式中的ID 替换成数组中对应的值，没有就取 0
              //   let num = evaluate(formVal, props.formData) 
              let num = props.formData[formVal] || ''
              formula = formula.replace(`{${formVal}}`, isNaN(num) || num === '' ? 0 : evaluate(formVal, props.formData))
            }
            // 根据函数算出值
            props.formData[props.id] = evaluate(formula)
          })
        }
      }
      // 关联其他组件，统计
      else if(relation.relationType === '1') {
        if(relation.relationTypePath.length === 1) {
          watch(()=>props.formData[props.item.relation.relationCompo],(val)=>{
            // 关联本表普通组件
            props.formData[props.id] = val
          })
        } else if(relation.relationTypePath.length === 2) {
          watch(()=>props.formData[relation.relationTypePath[0]],()=>{
            let sum = _(props.formData[relation.relationTypePath[0]]).map(item=>{
              return item[relation.relationTypePath[1]]
            }).compact().value()
            if(!sum[0]) { return }
            props.formData[props.id] = add(...sum,0)
          },{ deep:true })
        }
      }
      // 关联其他组件，相等
      else if(relation.relationType === '0') {
        watch(()=>props.formData[props.item.relation.relationCompo],(val)=>{
          // 关联本表普通组件
          props.formData[props.id] = val
        })
      }
    }

    return {
      tableData:[{}],
      ...toRefs(config),
      cardAdd,
      cardDelete,
      tableAdd,
      changeFileList,
      isRequired,
      showItemHandler,
      disabledItemHandler
    }
  },
  props:{
    span:{
      type:Number,
      default () {
        return 0
      }
    },
    item:{
      type:Object
    },
    formData:{
      type:Object
    },
    proxyOptions:{
      type:Object
    },
    pathSetObj:{
      type:Object
    },
    ifRequired:{
      type:Boolean,
      default:()=>false
    },
    ifDisabled:{
      type:Boolean,
      default:()=>false
    },
    id:{
      type:null,
    },
    // 校验是否必填增加的字段
    field:{ type: String, default:'' },
    formRef:{ type:Object },
    hidden:{
      type:Boolean,
    //   default:()=>false
    },
  }
}
</script>
<style lang="less" scoped>
.card-view {
  //   margin: 10px 0;

  .card-item {
    margin: 10px 0;
    border: 1px solid #eee;
    padding-top: 10px;
    background-color: #f7f7f8cc;

    .form-view {
      flex: 1;
      margin-right: 10px;
    }
  }

  .add-btn {
    display: block;
    margin: auto;
    width: 300px;
  }
}

</style>
