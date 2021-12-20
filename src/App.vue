<template>
  <a-layout class='root-layout' style="height: 400px;">
    <a-layout-header class='header'>    
      <a-menu mode="horizontal" :default-selected-keys="['1']">
        <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
          <div
            :style="{
              width: '80px',
              height: '30px',
              borderRadius: '2px',
              background: 'var(--color-fill-3)',
              cursor: 'text',
            }"
          />
        </a-menu-item>
        <a-menu-item key="1">Home</a-menu-item>
        <a-menu-item key="2">Solution</a-menu-item>
        <a-menu-item key="3">Cloud Service</a-menu-item>
        <a-menu-item key="4">Cooperation</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider  class='sider-menu' :style='{width: `${siderWidth}px`}'> 
        <a-menu
          :style="{ width: '200px', height: '100%' }"
          :default-open-keys="['0']"
          :default-selected-keys="['0_1']"
          show-collapse-button
        >
          <a-sub-menu :key="firstItem.title" v-for="(firstItem, index) in menus" >
            <template #title>
              <icon-apps></icon-apps> {{firstItem.title}}
            </template>
            <a-menu-item v-for='(oneItem, i) in firstItem.children ' @click="toPath(oneItem.path)" :key="`${index}_${i}`" > {{oneItem.title}}</a-menu-item>
          </a-sub-menu>
        </a-menu>    
      </a-layout-sider>
      <a-layout-content class='root-content'><router-view/>
      </a-layout-content>
    </a-layout>
    <a-layout-footer></a-layout-footer>
  </a-layout>
  
  
</template>
<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'app',
  setup () {
    let collapsed = ref(false)
    const router = useRouter()
    let menus = reactive([{
      path: '',
      title: 'demo',
      icon: '',
      children: [{
        path: '/',
        title: 'Home',
      },
      {
        path: '/about',
        title: 'about',
      },
      {
        path: '/example',
        title: 'example',
      }]
    }])
    function toPath (path) {
      router.push(path)
    }
    return {
      collapsed,
      menus,
      toPath
    }
  }
}
</script>
<style lang="less" src='./style/index.less' scoped/>

