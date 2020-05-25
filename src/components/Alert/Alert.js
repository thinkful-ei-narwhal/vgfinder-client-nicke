import React, { Component } from 'react';
import './Alert.css'

export function ShowAlert(props) {
  return (
    <div className={props.show}>
      {props.message}
    </div>)
}

export default class Alert extends Component {
  state = {
    show: "snackbar show"
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ show: "snackbar" });
      this.props.handleErrorClick();
    }, 2800)
  }

  render() {
    return (
      <ShowAlert message={this.props.message} show={this.state.show} />
    );
  }
}