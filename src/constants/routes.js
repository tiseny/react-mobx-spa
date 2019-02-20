import Loadable from 'react-loadable'
import { Spin } from 'antd'

const Home = Loadable({
  loader: () => import('../routers/Home'),
  loading: Spin,
  delay: 100
})

const ModuleList = Loadable({
  loader: () => import('../routers/Module/List'),
  loading: Spin,
  delay: 100
})

export default [{
  'path': '/home',
  'component': Home
}, {
  'path': '/module/list',
  'component': ModuleList
}]