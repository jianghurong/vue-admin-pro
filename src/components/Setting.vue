<!--
 * @Author: Richard Chiang
 * @Date: 2020-12-28 09:52:58
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2020-12-28 17:28:45
 * @Email: 19875991227@163.com
 * @Description: 
-->
<template>
    <div class="vue-admin-setting">
        <div class="vue-admin-setting-handle" @click="toggleVisible">
            <SettingOutlined v-if="!visible" />
            <CloseOutlined v-else />
        </div>
        <a-drawer
            width="400"
            :closable="false"
            v-model:visible="visible"
        >
            <h3>
                背景图
            </h3>
            <ul class="vue-admin-setting-sidebar-images">
                <li v-for="image in 4" :key="image" @click="handleSidebarImage(image)">
                    <img :src="require(`@/assets/images/sidebar-` + image + '.jpg')">
                </li>
            </ul>
        </a-drawer>
    </div>
</template>

<script>
import { ref } from 'vue'
import { SettingOutlined, CloseOutlined } from '@ant-design/icons-vue'

export default {
    name: 'SettingDrawer',
    components: {
        SettingOutlined,
        CloseOutlined
    },
    props: {
        setting: {
            type: Object,
            require: true
        }
    },
    emits: ['backgroundChange'],
    methods: {
      handleSidebarImage(imageIndex) {
        this.$emit('backgroundChange', imageIndex)
        localStorage.setItem('sidebar-image', imageIndex)
      }
    },
    setup() {
        const visible = ref(false)
        const toggleVisible = () => {
            visible.value = !visible.value
        }
        const onClose = () => {
            visible.value = false
        }
        return {
            visible,
            toggleVisible,
            onClose
        }
    }
}
</script>

<style lang="scss" scoped>
.vue-admin-setting {
    &-sidebar-images {
        display: flex;
        li {
            width: 70px;
            height: 100px;
            border: 2px solid transparent;
            border-radius: 10px;
            margin-right: 10px;
            overflow: hidden;
            cursor: pointer;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        li:hover {
            border: 2px solid #1890ff;
        }
    }
    &-handle {
        position: absolute;
        bottom: 50px;
        right: 10px;
        display: flex;
        width: 50px;
        height: 50px;
        justify-content: center;
        align-items: center;
        background: #1890ff;
        border-radius: 5px;
        color: #fff;
        font-size: 24px;
        z-index: 1001;
        cursor: pointer;
    }
}
</style>