import Loadable from 'react-loadable'
import { Spin } from 'antd'
import config from '../../config'

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
  'path': `${config.rootAlias}/home`,
  'component': Home
}, {
  'path': `${config.rootAlias}/module/list`,
  'component': ModuleList
}]