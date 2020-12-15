import { createApp } from 'vue'
import App from '@/App.vue'

// 引入路由文件
import router from '@/router'

import {
  Button,
  Row,
  Col,
  Form,
  Input,
  Layout,
  Menu
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

app.mount('#app')
