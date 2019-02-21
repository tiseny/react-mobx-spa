import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import Cookies from 'js-cookie'
import Layouts from './Layouts'
import Login from './Login'
import store from '@/store'
import config from '../../config'

@withRouter
class Routers extends Component {
  constructor(props) {
    super(props)
    this.pathname = props.location.pathname
  }

  checkJsessionID = () => {
    if (this.props.location.pathname != `${config.rootAlias}/login`) {
      if (!Cookies.get('JSESSIONID')) {
        this.props.history.replace(`${config.rootAlias}/login`)
      }
    } else {
      if (Cookies.get('JSESSIONID')) {
        this.props.history.replace(`${config.rootAlias}/home`)
      }
    }
  }

  componentWillMount() {
    if (this.pathname == '/') {
      if (Cookies.get('JSESSIONID')) {
        this.props.history.replace(`${config.rootAlias}/home`)
      } else {
        this.props.history.replace(`${config.rootAlias}/login`)
      }
    } else {
      this.checkJsessionID()
    }
  }

  componentWillReceiveProps() {
    this.checkJsessionID()
  }

  render() {
    return (
      <Provider { ...store }>
        <Switch>
          <Route path={`${config.rootAlias}/login`} component={Login} />
          <Route path={`${config.rootAlias}/`} component={Layouts} />
        </Switch>
      </Provider>
    )
  }
}

export default Routers
