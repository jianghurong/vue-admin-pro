import { createApp } from 'vue'
import App from '@/App.vue'

// 引入路由文件
import router from '@/router'

// 引入Mock
import '@/mock'

import {
  Button,
  Row,
  Col,
  Form,
  Input,
  Layout,
  Menu,
  Select
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

app.mount('#app')
