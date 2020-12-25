<template>
  <a-row :gutter="20">
    <a-col :span="8">
      <a-card>
        <a-avatar :size="70">
          <template #icon>
            <UserOutlined />  
          </template>
        </a-avatar>
        <h1>{{ userInfo.name }}</h1>
        <h2>{{ userInfo.description }}</h2>
      </a-card>
    </a-col>
    <a-col :span="16">
      <a-card>
        <a-row type="flex" align="center" :gutter="[20, 40]">
          <a-col flex="60px">Github</a-col>
          <a-col flex="auto">
            <a-button type="primary">
              <a href="https://github.com/jianghurong" target="_blank">follow</a>
            </a-button>
          </a-col>
        </a-row>
        <a-row type="flex" align="center" :gutter="[20, 40]">
          <a-col flex="60px">掘金</a-col>
          <a-col flex="auto">
            <a-button type="primary">
              <a href="https://juejin.cn/user/2400989124501549/posts" target="_blank">follow</a>
            </a-button>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { toRefs, reactive } from 'vue'
import axios from 'axios'
import { UserOutlined } from '@ant-design/icons-vue'

export default {
  name: 'Detail',
  components: {
    UserOutlined
  },
  setup() {
    const state = reactive({
      userInfo: {}
    })
    axios.get('/user')
      .then(res => {
        state.userInfo = res.data.userInfo
      })
    axios.get('/github')
    return {
      ...toRefs(state)
    }
  }
}
</script>
