<template>
  <a-layout>
    <a-layout-sider>
      <a-menu theme="dark">
        <a-menu-item v-for="menu in menus" :key="menu.name" @click="toPath(menu.path)">
          <span>{{ menu.meta.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'BasicLayout',
  setup() {
    const router = useRouter()
    const menus = router.getRoutes()
    const toPath = (path) => {
      router.push(path)
    }
    return {
      menus,
      toPath
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
