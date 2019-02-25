import Loadable from 'react-loadable'
import { Spin } from 'antd'
import config from '../../config'

const Home = Loadable({
  loader: () => import('../routers/Home'),
  loading: Spin,
  delay: 100
})

const Map = Loadable({
  loader: () => import('../routers/Amap'),
  loading: Spin,
  delay: 100
})

const Chat = Loadable({
  loader: () => import('../routers/Chat'),
  loading: Spin,
  delay: 100
})

export default [{
  'path': `${config.rootAlias}/home`,
  'component': Home
}, {
  'path': `${config.rootAlias}/amap`,
  'component': Map
}, {
  'path': `${config.rootAlias}/chat`,
  'component': Chat
}]