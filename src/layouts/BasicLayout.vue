<template>
  <a-layout>
    <a-layout-sider>
      <a-menu mode="inline" theme="dark">
        <div v-for="menu in menuList" :key="menu.name">
          <a-sub-menu
            v-if="menu.children"
          >
            <template #title>
              <span>{{ menu.meta.title }}</span>
            </template>
            <a-menu-item v-for="subMenu in menu.children" :key="subMenu.name">
              <router-link :to="subMenu.path">{{ subMenu.meta.title }}</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item
            v-else
          >
<!--            <a-icon icon="menu.meta.icon"></a-icon>-->
            <router-link :to="menu.path">{{ menu.meta.title }}</router-link>
          </a-menu-item>
        </div>
      </a-menu>
    </a-layout-sider>
    <a-layout-content>
      <a-breadcrumb>
        <a-breadcrumb-item
          v-for="bread in breadcrumbList"
          :key="bread.path"
          :href="bread.path"
        >
          <router-link :to="bread.path">
            {{ bread.name }}
          </router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { ref, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
import menus from '@/router/menus'

export default {
  name: 'BasicLayout',
  setup() {
    const route = useRoute()
    const menuList = menus.find(ele => ele.path === '/').children || []
    const breadcrumbList = ref([])
    // 获取面包屑列表
    const getBreadcrumbList = () => {
      let home = [
        {
          path: '/',
          name: '主页'
        }
      ]
      for (let i = 0 ; i < menuList.length; i++) {
        if (menuList[i].path === route.path) {
          breadcrumbList.value = home.concat([{
            path: route.path,
            name: route.meta.title
          }])
        }
        if (menuList[i].children) {
          let current = menuList[i].children.filter(ele => ele.path === route.path)
          if (current.length > 0) {
            breadcrumbList.value = home.concat([
              {
                path: menuList[i].path,
                name: menuList[i].meta.title
              },
              {
              path: route.path,
              name: route.meta.title
            }])
          }
        }
      }
    }
    getBreadcrumbList()
    onUpdated(() => {
      getBreadcrumbList()
    })
    return {
      menuList,
      breadcrumbList
    }
  }
}
</script>

<style lang="scss" scoped>
// @todo vh撑满视图不太友好，后续更换
.ant-layout {
  min-height: 100vh;
}
.ant-layout-content {
  padding: 24px;
}
</style>
