import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Dropdown, Layout, Breadcrumb, Icon, Menu } from 'antd'
import Cookies from 'js-cookie'
import ROUTERS from '@/constants/routes'
import './right.less'

@withRouter
@inject('breadcrumb')
@observer
class Right extends Component {
  constructor(props) {
    super(props)
  }

  logout = () => {
    Cookies.remove('token')
    this.props.history.replace('/login')
  }

  render() {
    const { breadcrumb } = this.props

    return (
      <Layout>
        <Layout.Header style={{ background: '#fff', padding: 0 }}>
          <Dropdown overlay={<Menu>
            <Menu.Item key="0" onClick={this.logout}>退出</Menu.Item>
          </Menu>} trigger={['click']}>
            <div className='user'>
              <Icon type="user"/>
              <a className="ant-dropdown-link" href="#">
                {Cookies.get('name')}
              </a>
            </div>
          </Dropdown>
        </Layout.Header>
        <Layout.Content>
          <Breadcrumb>
            {breadcrumb.list.map((item, index) => 
              <Breadcrumb.Item key={index}>
                {item.onClick ? <a href="javascript:;" onClick={item.onClick}>{item.title}</a> : item.title}
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
          <div className="main-wrap">
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
