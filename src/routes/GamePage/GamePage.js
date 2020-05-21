import React, { Component } from 'react';
import GamesApiService from '../../services/games-api-service';
import { Section } from '../../components/Utils/Utils';
import Header from './../../components/Header/Header';
import './GamePage.css'
import GamesCarousel from '../../components/GameCarousel/GameCarousel';
import GameContext from '../../contexts/GameContext'
import GameInfo from '../../components/GameInfo/GameInfo';
import YouTube from 'react-youtube';

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

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0,
      },
    };

    //Running loop twice to garauntee box art is first item pushed
    const reel = [];
    for (const [key, value] of Object.entries(this.context.game)) {
      if (key === "image_url_box_art") {
        reel.push({ imgUrl: value, gameId: this.context.game.id });
      }
    }
    for (const [key, value] of Object.entries(this.context.game)) {
      if (key !== "image_url_box_art" && key.includes("image") && value) {
        reel.push({ imgUrl: value, gameId: this.context.game.id });
      }
    }

    const youtubeUrl = this.context.game.trailer_url.split("=");
    const youtubeId = youtubeUrl[1].substring(0, youtubeUrl[1].indexOf('&'))

    return <>
      <Header pathName={this.props.location.pathname} />
      <Section className='GamePage'>
        <h2>{this.context.game.title}</h2>
        {error ? <p className='red'>There was an error, try again</p> : <GamesCarousel reel={reel} isSingleGame={true} />}
        <GameInfo game={this.context.game} />
      </Section>
      <Section>
        <h2>Trailer</h2>
        <YouTube videoId={youtubeId} opts={opts} onReady={this._onReady} />
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