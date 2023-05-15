import React, {Component} from 'react'
import Cookies from 'js-cookie'
import './Login.css'
import {Link, withRouter} from 'react-router-dom'

class Login extends Component {
  state = {
    email: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSucess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
    console.log(errorMsg)
  }

  handleEmailChange = e => {
    this.setState({email: e.target.value})
  }

  handlePasswordChange = e => {
    this.setState({password: e.target.value})
  }

  signIn = async e => {
    e.preventDefault()
    const {email, password} = this.state
    const userDetails = {username: email, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSucess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  register = () => {
    console.log('cc')
  }

  render() {
    const {email, password, showSubmitError, errorMsg} = this.state

    return (
      <div className="login">
        <Link to="/">
          <img
            className="login__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
            alt="Amazon Logo"
          />
        </Link>

        <div className="login__container">
          <h1>Sign-in</h1>

          <form>
            <h5>E-mail</h5>
            <input
              type="text"
              value={email}
              onChange={this.handleEmailChange}
            />

            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={this.handlePasswordChange}
            />
            <div>
              <p>
                {showSubmitError && <p className="error-message">{errorMsg}</p>}
              </p>
            </div>
            <button
              type="submit"
              onClick={this.signIn}
              className="login__signInButton"
            >
              Sign In
            </button>
          </form>

          <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
