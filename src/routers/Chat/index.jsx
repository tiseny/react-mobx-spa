import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Input, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import './index.less';
import { observable, action } from 'mobx';
import io from 'socket.io-client'

const socket = io();
const feman = require('../../assets/feman.png')
const man = require('../../assets/man.png')

let userId = ''
let typeInItem = {}

@inject('breadcrumb')
@observer
class Chat extends Component {
  constructor() {
    super()
  }

  @observable list = []
  @observable userList = []
  @observable value = ''

  componentWillUnmount() {
    socket.emit('offline',{
      from: userId,
      type: 'notify',
      date: moment().format('HH:mm'),
      msg: '下线了'
    })
  }

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
      let list = this.list.slice()
      list.push(obj)
      this.list = list
    });

    socket.on('online', (obj) => {
      let list = this.list.slice()
      let userList = this.userList.slice()
      let random = Math.ceil(Math.random()* 10) % 2  == 0

      list.push(obj)
      userList.push({
        userId: obj.from,
        path: random ? feman : man,
        other: random ? '确认过眼神' : '我遇上对的人'
      })

      this.list = list
      this.userList = userList
    })

    socket.on('offline', (obj) => {
      let list = this.list.slice()
      let userList = this.userList.slice()
      let index = userList.findIndex(item => item.userId === obj.from)
      
      list.push(obj)
      userList.splice(index, 1)

      this.list = list
      this.userList = userList
    })

    this.renderInitName();
  }

  render() {
    return (
      <div className='chat-page'>
        <div className="left-box">
          <div className="info-box">
            {
              this.list.map((item, index) => {
                return item.type === 'info' ? <div className={`item ${item.from == userId ? "self" : ""}`} key={index}>
                  <div className="title">{item.from} {item.date}</div>
                  <div className="msg">{item.msg}</div>
                </div> : <div className="notify"><span>{item.date}</span><span>{item.from}</span>{item.msg}</div>
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
        <div className="right-box">
          {
            this.userList.map((item, idx) => <div className="item" key={idx}>
                <img src={item.path}/>
                <div className="info-box">
                  <div className="name">{item.userId}</div>
                  <div className="other">{item.other}</div>
                </div>
              </div>
            )
          }
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
        
        socket.emit('online', {
          from: userId,
          type: 'notify',
          date: moment().format('HH:mm'),
          msg: '上线了'
        })
      }
    });
  }

  @action
  handleChange(e) {
    this.value = e.target.value
    typeInItem = {
      from: userId,
      type: 'info',
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


