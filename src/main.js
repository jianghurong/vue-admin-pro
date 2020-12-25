import { createApp } from 'vue'
import App from '@/App.vue'

// 引入路由文件
import router from '@/router'

// 引入Mock
import '@/mock'

import axios from 'axios'

import {
  Button,
  Row,
  Col,
  Form,
  Input,
  Layout,
  Menu,
  Select,
  Breadcrumb,
  Card,
  Avatar,
  Drawer
} from 'ant-design-vue'

const app = createApp(App)

app.use(router)
  .use(Button)
  .use(Row)
  .use(Col)
  .use(Form)
  .use(Input)
  .use(Layout)
  .use(Menu)
  .use(Select)
  .use(Breadcrumb)
  .use(Card)
  .use(Avatar)
  .use(Drawer)

app.config.globalProperties.$axios = axios

app.mount('#app')

