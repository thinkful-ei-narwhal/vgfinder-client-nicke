import React, { Component } from 'react';
import GamesApiService from '../../services/games-api-service';
import { Section } from '../../components/Utils/Utils';
import Header from './../../components/Header/Header';
import './GamePage.css'
import GamesCarousel from '../../components/GameCarousel/GameCarousel';
import GameContext from '../../contexts/GameContext'

export default class GamesHomePage extends Component {
  static contextType = GameContext;

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    const { gameId } = this.props.match.params;
    this.context.clearError();
    GamesApiService.getGame(gameId)
      .then(res => {
        this.context.setGame(res);
        this.setState({ loaded: true });
      })
      .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearGame();
  }

  renderGame() {
    const { error } = this.context
    return <>
      <Header pathName={this.props.location.pathname} />
      <Section className='GamePage'>
        {error ? <p className='red'>There was an error, try again</p> : <GamesCarousel gamesList={[this.context.game]} />};
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