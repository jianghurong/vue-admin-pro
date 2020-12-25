import Mock from 'mockjs'

Mock.mock(/\/user/, 'get', {
  'userInfo': {
    'name': 'Answer',
    'description': 'You can be better .',
  }
})
