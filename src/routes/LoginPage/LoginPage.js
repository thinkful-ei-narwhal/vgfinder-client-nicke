import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { Section } from '../../components/Utils/Utils'
import Header from './../../components/Header/Header';

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/homepage'
    history.push(destination)
  }

  render() {
    return (
      <>
        <Header pathName={this.props.location.pathname} />
        <Section className='LoginPage'>
          <h2>Login</h2>
          <LoginForm
            onLoginSuccess={this.handleLoginSuccess}
          />
        </Section>
      </>
    )
  }
}
