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
            <router-link :to="menu.path">{{ menu.meta.title }}</router-link>
          </a-menu-item>
        </div>
      </a-menu>
    </a-layout-sider>
    <a-layout-content>
      <a-breadcrumb>
        <a-breadcrumb-item>
          <router-link to="/">
            首页
          </router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link :to="route.path">
            {{ route.meta.title }}
          </router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { useRoute } from 'vue-router'
import menus from '@/router/menus'

export default {
  name: 'BasicLayout',
  setup() {
    const route = useRoute()
    const menuList = menus.find(ele => ele.path === '/').children || []
    return {
      menuList,
      route
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
