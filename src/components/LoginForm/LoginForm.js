import React, { Component } from "react";
import { Button, Input } from "../Utils/Utils";
import TokenService from "./../../services/token-service";
import AuthApiService from "../../services/auth-api-service";
import Alert from "./../Alert/Alert";

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  state = { error: null };

  handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = ev.target;

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then((res) => {
        user_name.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch((err) => {
        this.setState({ error: err.message });
      });
  };

  handleErrorClick = () => {
    this.setState({ error: null });
  };

  componentWillUnmount() {
    this.setState({ error: null }); //forces a component did mount to retrigger and recapture userId
  }

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
        <div role="alert">
          {error && (
            <Alert message={error} handleErrorClick={this.handleErrorClick} />
          )}
        </div>
        <div className="form-container">
          <div className="label-container">
            <label htmlFor="LoginForm__user_name">User name</label>
          </div>
          <div className="input-container">
            <Input required name="user_name" id="LoginForm__user_name"></Input>
          </div>
        </div>
        <div className="form-container">
          <div className="label-container">
            <label htmlFor="LoginForm__password">Password</label>
          </div>
          <div className="input-container">
            <Input
              required
              name="password"
              type="password"
              id="LoginForm__password"
            ></Input>
          </div>
        </div>
        <Button type="submit">Login</Button>
      </form>
    );
  }
}
