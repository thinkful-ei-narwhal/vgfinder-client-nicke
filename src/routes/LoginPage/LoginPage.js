import React, { Component } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Section } from "../../components/Utils/Utils";
import Header from "./../../components/Header/Header";
import "./LoginPage.css";

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/homepage";
    history.push(destination);
  };

  render() {
    return (
      <>
        <Header pathName={this.props.location.pathname} />
        <Section>
          <h2>Login</h2>
          <LoginForm
            className="LoginPage"
            onLoginSuccess={this.handleLoginSuccess}
          />
        </Section>
      </>
    );
  }
}
