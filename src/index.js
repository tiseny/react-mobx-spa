import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import Routers from '@/routers'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    )
  }
}

render(<App />, document.getElementById('root'))

if (module.hot) {
    module.hot.accept()
}
