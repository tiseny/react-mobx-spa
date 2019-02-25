import React, { Component } from 'react'
import { Form, Input, Button, Icon } from 'antd'
import { observer } from 'mobx-react'
import { observable } from 'mobx';
const FormItem = Form.Item

@Form.create()
@observer
class FromBox extends Component {
  constructor(props) {
    super(props)
  }

  @observable
  loading = false


  handleSubmit = e => {
    e.preventDefault()
    this.props.submit(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('userCode', {
            rules: [{ required: true, message: '输入admin' }]
          })(
            <Input prefix={<Icon type='user'/>} placeholder='ssh' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '密码是123456' }]
          })(
            <Input prefix={<Icon type='lock'/>} type='password' placeholder='654321' />
          )}
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit' loading={this.loading}>登录</Button>
        </FormItem>
      </Form>
    )
  }
}

export default FromBox
