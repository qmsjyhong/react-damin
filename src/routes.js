import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import history from './history/index'
import Login from './pages/login/login'
import Help from './pages/help/help'

class App extends React.Component {
  constructor (props, context) {
    super(props, context)
  }
  render () {
    return (
      <Router history={history}>
        <div>
          {/**
                                                                                                                         * 这里可以公共的样式,比如 头部, 尾部, 等.
                                                                                                                         */}
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/login' component={Login} />
            <Route path='/help' component={Help} />
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App
