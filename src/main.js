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
  Breadcrumb
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

// vue2 vue.prototype.$https = () => {}
// vue3
app.config.globalProperties.$axios = axios

app.mount('#app')

