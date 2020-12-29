<template>
    <a-layout>
        <a-layout-sider width="250" class="vue-admin-sider">
            <a-menu>
                <div v-for="menu in menuList" :key="menu.name">
                    <a-sub-menu v-if="menu.children">
                        <template #title>
                            <span>{{ menu.meta.title }}</span>
                        </template>
                        <a-menu-item
                            v-for="subMenu in menu.children"
                            :key="subMenu.name"
                        >
                            <router-link :to="subMenu.path">{{
                                subMenu.meta.title
                            }}</router-link>
                        </a-menu-item>
                    </a-sub-menu>
                    <a-menu-item v-else>
                        <router-link :to="menu.path">{{
                            menu.meta.title
                        }}</router-link>
                    </a-menu-item>
                </div>
            </a-menu>
            <div class="vue-admin-sider-background"></div>
        </a-layout-sider>
        <a-layout-content>
            <a-breadcrumb>
                <a-breadcrumb-item>
                    <router-link to="/"> 首页 </router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    <router-link :to="route.path">
                        {{ route.meta.title }}
                    </router-link>
                </a-breadcrumb-item>
            </a-breadcrumb>
            <setting-drawer
                :setting="setting"
                @backgroundChange="siderBackgroudChange"
            />
            <router-view></router-view>
        </a-layout-content>
    </a-layout>
</template>

<script>
/*eslint-disable*/
// https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-style-variables.md
// https://github.com/vuejs/rfcs/pull/231
import SettingDrawer from "@/components/Setting";
import menus from "@/router/menus";
import { useRoute } from "vue-router";
import { reactive, nextTick } from "vue";

export default {
    name: "BasicLayout",
    components: {
        [SettingDrawer.name]: SettingDrawer,
    },
    setup() {
        const route = useRoute();
        const menuList = menus.find((ele) => ele.path === "/").children || [];
        const setting = reactive({
            show: false,
        });
        const siderBackgroudChange = (imageIndex) => {
            nextTick(() => {
                let siderBackground = document.querySelectorAll(
                    ".vue-admin-sider-background"
                )[0];
                siderBackground.style.backgroundImage = `url(/static/images/sidebar-${imageIndex}.jpg)`;
            });
        };
        let imageIndex = localStorage.getItem("sidebar-image");
        siderBackgroudChange(imageIndex ? imageIndex : "1");
        return {
            setting,
            menuList,
            route,
            siderBackgroudChange,
        };
    },
};
</script>

<style lang="scss" scoped>
.vue-admin-sider {
    position: relative;
    box-shadow: 10px -10px 10px -10px rgba(0, 0, 0, 0.5);
}
.ant-menu {
    position: absolute;
    width: 100%;
    background: transparent;
    color: #333;
    z-index: 3;
}
.vue-admin-sider-background {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow: auto;
    background-image: url("/static/images/sidebar-2.jpg");
    background-size: cover;
    background-position: 50%;
    background-repeat: no-repeat;
    z-index: 1;
    &:after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: "";
        display: block;
        background: #fff;
        opacity: 0.9;
        z-index: 2;
    }
}
// @todo vh撑满视图不太友好，后续更换
.ant-layout {
    min-height: 100vh;
}
.ant-layout-content {
    padding: 24px;
}
.ant-breadcrumb {
    margin-bottom: 24px;
}
</style>
