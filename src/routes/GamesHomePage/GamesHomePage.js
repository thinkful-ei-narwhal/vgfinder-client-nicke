import React, { Component } from 'react';
import GamesApiService from '../../services/games-api-service';
import GamesListContext from '../../contexts/GamesListContext';
import { Section } from '../../components/Utils/Utils';
import Header from './../../components/Header/Header';
import './GamesHomePage.css'
import GameInfo from '../../components/GameInfo/GameInfo';
import GamesCarousel from '../../components/GameCarousel/GameCarousel';

export default class GamesHomePage extends Component {
  static contextType = GamesListContext;

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      activeGameId: 0
    }
  }

  setActiveGame = (activeGameId) => {
    this.setState({ activeGameId });
  }

  componentDidMount() {
    this.context.clearError()
    GamesApiService.getGames()
      .then(res => {
        this.context.setGamesList(res)
        this.setState({ loaded: true, activeGameId: res[0].id })
      })
      .catch(this.context.setError)
  }

  renderGamesHomePage() {
    const { error } = this.context
    const games = this.context.gamesList.map(game => game);
    const reel = games.map(game => { return { imgUrl: game.image_url_box_art, gameId: game.id } });
    const activeGame = games.find(game => game.id === this.state.activeGameId);
    return <>
      <Header pathName={this.props.location.pathname} />
      <Section className='GamesListPage'>
        <h2>{activeGame.title}</h2>
        {error ? <p className='red'>There was an error, try again</p>
         : <GamesCarousel reel={reel} isSingleGame={false} setActiveGame={this.setActiveGame} />}
        <GameInfo game={activeGame} />
      </Section>
    </>
  }

  render() {
    return (
      <>
        {this.state.loaded ? this.renderGamesHomePage() : null}
      </>
    )
  }
}