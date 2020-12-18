import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/layouts/BasicLayout'),
            redirect: '/login',
            meta: { title: '主页' },
            children: [
                {
                    path: '/dash',
                    name: 'dash',
                    meta: { title: '导航' },
                    component: () => import('@/views/Dash')
                },
                {
                    path: '/form',
                    name: 'form',
                    component: () => import('@/layouts/RouterLayout'),
                    children: [
                        {
                            path: '/basic/form',
                            name: 'basicForm',
                            meta: { title: '表单' },
                            component: () => import('@/views/form/BasicForm')
                        }
                    ]
                },
                {
                    path: '/editor',
                    name: 'editor',
                    component: () => import('@/layouts/RouterLayout'),
                    children: [
                        {
                            path: '/editor/create',
                            name: 'editorCreate',
                            meta: { title: '富文本' },
                            component: () => import('@/views/editor/Create')
                        }
                    ]
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            meta: { title: '登录' },
            component: () => import('@/views/Login')
        }
    ]
})

export default  router
