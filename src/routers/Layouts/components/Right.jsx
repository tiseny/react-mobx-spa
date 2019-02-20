import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Tooltip, Layout, Breadcrumb, Icon } from 'antd'
import Cookies from 'js-cookie'
import ROUTERS from '@/constants/routes'
import './right.less'

@withRouter
@inject('Root')
@observer
class Right extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    let { userInfo, updateName } = this.props.Root
    if (userInfo.name == '') {
      updateName(Cookies.get('userName'))
    }
  }

  logout = () => {
    this.props.logout()
  }

  render() {
    const { name } = this.props.Root.userInfo

    return (
      <Layout>
        <Layout.Header style={{ background: '#fff', padding: 0 }}>
          <div className='user'>
            <Icon type="user"/>
            <Tooltip title={<span style={{ fontSize: '14px', cursor: 'pointer' }} onClick={this.logout}>退出</span>}>
              <span className='name'>{name}</span>
            </Tooltip>
          </div>
        </Layout.Header>
        <Layout.Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {ROUTERS.map((item, i) =>
                <Route key={i} path={item.path} component={item.component} exact />
              )}
          </div>
        </Layout.Content>
      </Layout>
    )
  }
}

export default Right
