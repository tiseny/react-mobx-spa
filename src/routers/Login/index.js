import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import { message, Spin } from 'antd'
import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'
import service from '@/service/modules/login'
import FormBox from './components/FormBox'
import config from '../../../config'
import './index.less'

@inject('Login', 'Root')
@observer
class Login extends Component {
    constructor(props) {
      super(props)
    }

    @observable
    pending = false

    submit = form => {
      const { Root, history } = this.props
      form.validateFields(async(err, values) => {
        if (!err) {
          this.pending = true
          let { userCode, password } = values
          const param = {
            userCode,
            password,
            loginType: 2
          }
          const result = await service.login(param).catch(err => {
            this.pending = false
            throw err
          })
          this.pending = false
          if (result.IsSuccess) {
            let message = `M&${userCode}&${password}`
            let key = 'react_starter'
            let session = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(message, key))
            Cookies.set('JSESSIONID', session, { expires: 1, path: '/' })
            Cookies.set('userCode', userCode, { expires: 1, path: '/' })
            Root.updateName(userCode)
            history.push(`${config.rootAlias}/home`)
          } else {
            message.error(result.Msg)
          }
        }
      })
    }

    componentWillUnmount() {
      clearTimeout(this.timer)
    }

    render() {
      return (
        <div className='Login_wrap clearFix'>
          <div className="inner-background"></div>
          <div className='login_form'>
            <Spin tip="载入中..." spinning={this.pending}>
              <div className="login-logo">
                <img src={require('../../assets/logo1.png')}/>
                <span>运 可 视</span>
              </div>
              <FormBox submit={this.submit} />
            </Spin>
          </div>
        </div>
      )
    }
}

export default Login
