import axios from 'axios'
import Mock from 'mockjs'

Mock.mock(/\/meta\/department/, 'get',{
  'list|1-10': [
    {
      'id|+1': 1
    }
  ]
})

axios.get('/meta/department')
  .then(res => {
    console.log(res.data)
  })
