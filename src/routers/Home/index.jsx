import React, { Component } from 'react'
import { inject } from 'mobx-react';

@inject('breadcrumb')
class Home extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.breadcrumb.setNav([{
      title: '首页'
    }])
  }

  render() {
    return (
      <div className='Home_'>
        home
      </div>
    )
  }
}

export default Home
