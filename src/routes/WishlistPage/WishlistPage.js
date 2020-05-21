import './WishlistPage.css'
import React, { Component } from 'react';
import Header from './../../components/Header/Header';
import { Section } from './../../components/Utils/Utils'

export default class WishlistPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    this.setState({ loaded: true });
    // const { userId } = this.props.match.params;
    // this.context.clearError();
    //Call for wishlist of user and display
    // GamesApiService.getGame(gameId)
    //   .then(res => {
    //     this.context.setGame(res);
    //     this.setState({ loaded: true });
    //   })
    //   .catch(this.context.setError)
  }

  componentWillUnmount() {
    // this.context.clearGame();
  }

  renderGame() {
    // const { error } = this.context
    return <>
      <Header pathName={this.props.location.pathname} />
      <Section className='GamePage'>
      </Section>
    </>
  }

  render() {
    return (
      <>
        {this.state.loaded ? this.renderGame() : null}
      </>
    )
  }
}