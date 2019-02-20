import React, { Component } from 'react'
import { Form, Input, Button, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
const FormItem = Form.Item

@inject('Login')
@observer
@Form.create()
class FromBox extends Component {
  constructor(props) {
    super(props)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.submit(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { loading } = this.props.Login
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '输入admin' }]
          })(
            <Input prefix={<Icon type='user'/>} placeholder='admin' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '密码是123456' }]
          })(
            <Input prefix={<Icon type='lock'/>} type='password' placeholder='123456' />
          )}
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit' loading={loading}>登录</Button>
        </FormItem>
      </Form>
    )
  }
}

export default FromBox
