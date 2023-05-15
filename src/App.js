import React, {Component} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css'
import Header from './Header'
import Home from './Home'
import Checkout from './Checkout'
import Login from './Login'
import Payment from './Payment'
import Orders from './Orders'
import ProtectedRoute from './ProtectedRoute'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <ProtectedRoute exact path="/checkout">
              <Header />
              <Checkout />
            </ProtectedRoute>
            <ProtectedRoute exact path="/payment">
              <Header />
              <Payment />
            </ProtectedRoute>
            <ProtectedRoute exact path="/">
              <Header />
              <Home />
            </ProtectedRoute>
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App
