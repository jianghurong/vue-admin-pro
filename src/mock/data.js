import Mock from 'mockjs'

Mock.mock(/\/meta\/department/, 'get',{
  'list|10': [
    {
      'id|+1': 1
    },
    {
      'name|+1': ['技术部', '财务部', '行政部', '总裁办', '运营部', '市场部']
    }
  ]
})

