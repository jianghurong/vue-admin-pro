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
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script>
/* eslint-disable*/
import { h } from 'vue'
import menus from '@/router/menus'

export default {
  name: 'BasicLayout',
  // components: {
  //   'a-icon': {
  //     prop: {
  //       icon: String
  //     },
  //     render(h) {
  //       console.log(this.icon)
  //       return h(this.icon, {})
  //     }
  //   }
  // },
  setup() {
    const menuList = menus.find(ele => ele.path === '/').children || []
    return {
      menuList
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
