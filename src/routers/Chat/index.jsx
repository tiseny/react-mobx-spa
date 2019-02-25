import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Input, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import './index.less';
import { observable, action } from 'mobx';
import io from 'socket.io-client'


let userId = ''
const socket = io();

let typeInItem = {}

@inject('breadcrumb')
@observer
class Chat extends Component {
  constructor() {
    super()
  }

  @observable list = []
  @observable value = ''

  componentDidMount() {
    this.props.breadcrumb.setNav([{
      title: '首页',
      onClick: () => {
        this.props.history.replace('/home')
      }
    }, {
      title: '聊天室'
    }])
    // 接收到服务端的信息
    socket.on("message", (obj) => {
      console.log(obj)
      let list = this.list.slice()
      list.push(obj)
      this.list = list
    });

    this.renderInitName();
  }

  render() {
    return (
      <div className='chat-page'>
        <div className="info-box">
          {
            this.list.map((item, index) => {
              return <div className={`item ${item.from == userId ? "self" : ""}`} key={index}>
                <div className="title">{item.from} {item.date}</div>
                <div className="msg">{item.msg}</div>
              </div>
            })
          }
        </div>
        <div className="msg-textArea">
          <Input.TextArea
            key={this.inputKey}
            value={this.value}
            id="input"
            style={{height: '100%'}} 
            placeholder="按enter键发送" 
            ref={instance => this.InputDom = instance}
            onChange={this.handleChange.bind(this)} 
            onPressEnter={this.handleEnter.bind(this)}
          ></Input.TextArea>
        </div>
      </div>
    )
  }

  //
  renderInitName() {
    return Modal.info({
      title: '请输入的名字',
      content: <div className="name-wraps"><Input ref={instance => this.inputName = instance}/></div>,
      okText: '确定',
      onOk: () => {
        userId = ReactDOM.findDOMNode(this.inputName).value
      }
    });
  }

  @action
  handleChange(e) {
    this.value = e.target.value
    typeInItem = {
      from: userId,
      date: moment().format('HH:mm'),
      msg: e.target.value
    }
  }

  @action 
  handleEnter() {

    this.value = ""  
    
    socket.emit("message", typeInItem);
    
    document.getElementById('input').focus()
    // 设置光标复原
    setTimeout(() => {
      document.getElementById('input').setSelectionRange(0, 0)
    }, 30)
  }
}

export default Chat


