import { BasicLayout, RouterLayout } from '@/layouts'

// 引入图标
import {
  MenuOutlined
} from '@ant-design/icons-vue'

const menus = [
  {
    path: '/',
    name: 'home',
    component: BasicLayout,
    redirect: '/login',
    meta: { title: '主页', icon: MenuOutlined },
    children: [
      {
        path: '/dash',
        name: 'dash',
        meta: { title: '导航模块', icon: MenuOutlined },
        component: () => import('@/views/Dash')
      },
      {
        path: '/form',
        name: 'form',
        component: RouterLayout,
        meta: {
          title: '表单模块',
        },
        children: [
          {
            path: '/basic/form',
            name: 'basicForm',
            meta: { title: '基础表单' },
            component: () => import('@/views/form/BasicForm')
          }
        ]
      },
      {
        path: '/editor',
        name: 'editor',
        component: RouterLayout,
        meta: {
          title: '富文本模块',
        },
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
export default menus
