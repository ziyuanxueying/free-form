<template>
  <a-form-item
    v-show="!hide&&item.type!=='NxCard'"
    :field="field&&id?`${field}${id}`:field||id"
    :label="item.configList.label|| item.moduleName"
    :required="ifRequired||(pathSetObj[id]?.required?required:(item.configList.required||false))"
    :disabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))"
    :validate-trigger="['change','input']"
    :hideLabel="item.hideLabel"
    :rules="[{required:ifRequired||(pathSetObj[id]?.required?required:(item.configList.required||false)),message:'请完善当前项'},] "
  >
    <a-input v-if="item.type=='NxInput'" v-model="formData[id]" :placeholder="item.configList.placeholder||'请输入'"/>
    <n-upload
      v-if="item.type=='NxUpload'"
      :default-files="deafultList"
      v-model:files="formData[id]"
      :limit="item.configList.maxCount"
      :state="$route.query.type === 'edit' ? 'edit' :'detail'"
    />
    <a-textarea
      v-if="item.type=='NxTextarea'"
      v-model="formData[id]"
      :placeholder="item.configList.placeholder||'请输入'"
      :max-length="item.configList.maxLength"
    />
    <a-input-number
      v-else-if="item.type=='NxInputNum'"
      v-model="formData[id]"
      :placeholder="item.configList.placeholder||'请输入'"
      :min="item.configList.min"
      :max="item.configList.max"
      :precision="item.configList.precision" 
    />
    <template v-if="item.type=='NxInput'" #extra>
      {{ item.configList.min ? `限制最小输入值为${item.configList.min},`:'' }}
      {{ item.configList.max ? `限制最大输入值为${item.configList.max}`:'' }}
    </template>
    <a-typography-paragraph v-if="item.type=='NxText'" :style="`width: 100%; text-align:${item.configList.position||'left'};`">
      {{ item.configList.defaultVal }}
    </a-typography-paragraph>
    <a-date-picker
      v-if="item.type=='NxDatePicker'"
      :placeholder="item.configList.placeholder||'请输入'"
      allow-clear
      v-model="formData[id]"
      :format="item.configList.format"
      :disabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))"
    />
    <a-range-picker
      v-if="item.type=='NxRangePicker'"
      v-model="formData[id]"
      allow-clear
      :disabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))"
    />
    <a-switch v-if="item.type=='NxSwitch'" v-model="formData[id]"/>
    <a-select
      v-if="item.type=='NxSelect'"
      v-model="formData[id]"
      :placeholder="item.configList.placeholder||'请选择'"
      :multiple="item.configList.multiple"
    >
      <a-option v-for="(citem,index) in proxyOptions[id]" :key="index" :value="citem.key || citem.value">
        {{ citem.value }}
      </a-option>
    </a-select>
    <itemOa
      v-if="['NxStaff','NxOAName','NxOADepart','NxOABank','NxOACity','NxOALinkForm'].includes(item.type)"
      :item="item"
      :formData="formData"
      :pathSetObj="pathSetObj"
      :proxyOptions="proxyOptions"
      :id="item.configList.fileId||item.componentId"
      :ifDisabled="ifDisabled"
    />
    <a-space v-if="item.type=='NxCheckbox'" direction="vertical" size="large">
      <a-checkbox-group v-model="formData[item.configList.fileId]" :disabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))">
        <a-checkbox v-for="(citem,index) in proxyOptions[item.configList.fileId]" :key="index" :value="citem.key || citem.value">
          {{ citem.value }}
        </a-checkbox>
      </a-checkbox-group>
    </a-space>
    <a-row v-if="item.type=='NxGrid'" style="width: 100%;">
      <a-col
        :span="Math.floor(24 / item.configList.layout.colCount)"
        v-for="(citem,cindex ) in item.configList.layout.colContent"
        :key="cindex"
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
      >
        <FormItem
          v-for="(ccitem,ccindex) in citem"
          :item="ccitem"
          :formData="formData"
          :key="ccindex"
          :proxyOptions="proxyOptions"
          :pathSetObj="pathSetObj"
          :ifRequired="ifRequired||(pathSetObj[id]?.required?required:(item.configList.required||false))"
          :ifDisabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))"
          :id="ccitem.configList.fileId||ccitem.componentId"
          :field="field"
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
        >
          <template #cell="{ rowIndex }">
            <div class="nxf-table-td" v-for="(ccitem,ccindex) in item.configList.layout.colContent[index]" :key="ccindex">
              <FormItem
                :item="ccitem"
                :formData="formData[item.configList.layout.fileId][rowIndex]"
                :proxyOptions="proxyOptions"
                :pathSetObj="pathSetObj"
                :ifRequired="ifRequired||(pathSetObj[id]?.required?required:(item.configList.required||false))"
                :ifDisabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))"
                :id="`${ccitem.configList.fileId||ccitem.componentId}`"
                :field="`${item.configList.layout.fileId}.${rowIndex}.`"
              />
            </div>
            <a-space v-if="citem.key === 'operate'">
              <a-button class="add-btn" type="outline" @click="tableAdd(rowIndex)">
                添加
              </a-button>
              <a-button
                v-show="rowIndex"
                class="add-btn"
                type="outline"
                @click="cardDelete(rowIndex)"
              >
                删除
              </a-button>
            </a-space>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </a-form-item>
  <template v-if="item.type=== 'NxCard'">
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
              :ifRequired="ifRequired||(pathSetObj[id]?.required?required:(item.configList.required||false))"
              :ifDisabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))"
              :id="ccitem.configList.fileId||ccitem.componentId"
              :field="id.indexOf('NxGrid') === -1 ?`${item.configList.layout.fileId}.${dindex}.`:`${item.configList.layout.fileId}.${dindex}.${ccitem.configList.fileId||ccitem.componentId}`"
            />
          </div>
          <a-button
            v-if="!ifDisabled"
            :style="!dindex&&'visibility:hidden'"
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
          :ifRequired="ifRequired||(pathSetObj[id]?.required?required:(item.configList.required||false))"
          :ifDisabled="ifDisabled||(pathSetObj[id]?.disabled?disabled:(item.configList.disabled||false))"
          :id="ccitem.configList.fileId||ccitem.componentId"
        />
      </div>
    </template>
  </template>
</template>
<script>
import { reactive, toRefs, watch } from 'vue-demi'
import{ getForm } from '../utils'
import itemOa from './itemOa.vue'
import { NUpload } from '@naxions/nax-common'
export default {
  components:{ itemOa, NUpload },
  name:'FormItem',
  setup (props) {
    const config = reactive({
      disabled:false,
      required:false,
      hide:false,
      columns:null,
      deafultList: [],
    })
    if(props.item.type === 'NxTable') {
      config.columns = [ ...props.item.configList.layout?.columns, ...[{ key:'operate',value:'操作' }]]
    }
    if(props.item.type === 'NxDatePicker') {
      props.item.configList.showToday && (props.formData[props.id] = Date.now())
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

    watch(()=>props.formData,()=>{
      if(props.item.type === 'NxUpload' && !config.deafultList.length) {
        let val = JSON.stringify(props.formData[props.id] || [])
        if(val !== JSON.stringify(config.deafultList)) {
          config.deafultList = JSON.parse(val)
        }
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
    return {
      tableData:[{}],
      ...toRefs(config),
      cardAdd,
      cardDelete,
      tableAdd,
    }
  },
  props:{
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
    field:{ type: String, default:'' }
  }
}
</script>
<style lang="less" scoped>
.card-view {
  margin: 10px 0;

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
    width: 400px;
  }
}

</style>