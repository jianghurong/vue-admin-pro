import Mock from 'mockjs'

Mock.mock(/\/meta\/department/, 'get', {
  'list|6': [
    {
      'id|+1': 1,
      'name|+1': ['技术部', '财务部', '行政部', '总裁办', '运营部', '市场部']
    }
  ]
})

Mock.mock(/\/statistics\/newlyUser/, 'get', [
    {
      month: '一月',
      amount: 26000
    },
    {
      month: '二月',
      amount: 66000
    },
    {
      month: '三月',
      amount: 32000
    },
    {
      month: '四月',
      amount: 46000
    },
    {
      month: '五月',
      amount: 56000
    },
    {
      month: '六月',
      amount: 106000
    },
    {
      month: '七月',
      amount: 112000
    },
    {
      month: '八月',
      amount: 66000
    },
    {
      month: '九月',
      amount: 82000
    },
    {
      month: '十月',
      amount: 46000
    },
    {
      month: '十一月',
      amount: 66000
    },
    {
      month: '十二月',
      amount: 76000
    },
  ]
)

Mock.mock(/\/statistics\/video/, 'get', [
  {
    type: '生活',
    value: 271212
  },
  {
    type: '科技',
    value: 110123
  },
  {
    type: '教育',
    value: 102312
  },
  {
    type: '游戏',
    value: 76000
  },
  {
    type: '音乐与舞蹈',
    value: 121022
  },
  {
    type: '其它',
    value: 112400
  }
])