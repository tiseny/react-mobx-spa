import config from '../../config'
export default [{
  name: '首页',
  path: `${config.rootAlias}/home`,
  icon: 'home'
}, {
  name: '其他',
  path: `${config.rootAlias}/module`,
  icon: 'heart',
  sub: [{
    name: '其他一',
    path: '/list'
  }]
}]