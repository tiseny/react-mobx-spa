import React, { Component } from 'react'
import { Layout } from 'antd'
import Cookies from 'js-cookie'
import Left from './components/Left'
import Right from './components/Right'

class Layouts extends Component {

    logout = () => {
      Cookies.remove('JSESSIONID', { path: '/' })
      Cookies.remove('userName', { path: '/' })
      this.props.history.replace('/login')
    }

    render() {
      return (
        <Layout style={{ minHeight: '100vh' }}>
          <Left />
          <Right logout={this.logout} />
        </Layout>
      )
    }
}

export default Layouts
