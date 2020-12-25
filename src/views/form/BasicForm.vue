<template>
  <!-- @todo 基础表单开发 -->
  <a-form>
    <a-form-item label="姓名">
      <a-input></a-input>
    </a-form-item>
    <a-form-item label="部门">
      <a-select>

      </a-select>
    </a-form-item>
  </a-form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BasicForm',
  setup() {
    axios.get('/meta/department')
      .then(res => {
        console.log(res)
      })
  }
}
</script>
