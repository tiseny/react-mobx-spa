import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Layout, Icon, Menu } from 'antd'
import SIDE_MENUS from '@/constants/menu'
import './left.less';

@withRouter
@observer
class Left extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.selectKey()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname != nextProps.location.pathname) {
      this.selectKey()
    }
  }

  @observable
  collapsed = false
  keys = ['/home']

  render() {
    return <Layout.Sider
      collapsible
      collapsed={this.collapsed}
      onCollapse={this.handleCollapse.bind(this)}
    >
      <div className='logo'>
        <img src={require('@/assets/logo.svg')} />
        <h1>ant design</h1>
      </div>
      <Menu
        mode='inline'
        theme='dark'
        onSelect={this.handleSelect.bind(this)}
        selectedKeys={this.keys}
        defaultOpenKeys={['/' + this.keys[0].split('/')[1]]}
      >
        {SIDE_MENUS.map((item) =>
          item.sub && item.sub.length > 0
            ? (
              <Menu.SubMenu key={item.path} title={<span><Icon type={item.icon}/><span>{item.name}</span></span>}>
                {item.sub.map((sub) =>
                  <Menu.Item key={`${item.path}${sub.path}`}>
                    <span>{sub.name}</span>
                  </Menu.Item>
                )}
              </Menu.SubMenu>
            )
            : (
              <Menu.Item key={item.path}>
                <Icon type={item.icon}/>
                <span>{item.name}</span>
              </Menu.Item>
            )
        )}
      </Menu>
    </Layout.Sider>
  }

  @action
  selectKey = () => {
    let keys = []
    keys.push(this.props.history.location.pathname)
    this.keys = keys
  }

  @action
  handleCollapse() {
    this.collapsed = !this.collapsed
  }

  @action
  handleSelect({ key }) {
    this.props.history.push(key)
  }
}

export default Left
