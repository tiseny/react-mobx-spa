import React from 'react'
import { Menu } from 'antd';
import './index.less'
import amap from './components'
import MAP_DATA from './constants'
import { inject } from 'mobx-react';
import { observable, action } from 'mobx';

@inject('breadcrumb')
class Amap extends React.PureComponent {

  @observable
  active = 0

  componentDidMount() {
    this.props.breadcrumb.setNav([{
      title: '首页',
      onClick: () => {
        this.props.history.replace('/home')
      }
    }, {
      title: '地图'
    }])
  }

  render() {
    
    const Elments = amap[MAP_DATA[this.active].component]
    
    return <div className="map-page">
      <div className="navs">
        <Menu
          onClick={this.handleClick.bind(this)}
          style={{ width: 256 }}
          defaultSelectedKeys={['' + this.active]}
          mode="inline"
        >
          {MAP_DATA.map((item, index) => 
            <Menu.Item key={index}>{item.title}</Menu.Item>
          )}
        </Menu>
      </div>
      <div className="map-area">
        <Elments/>
      </div>
    </div>
  }
  
  @action
  handleClick(e) {
    this.active = e.key
  }
	
}


export default Amap;

