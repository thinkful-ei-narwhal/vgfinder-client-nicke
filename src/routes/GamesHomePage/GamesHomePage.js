import React, { Component } from 'react';
import GamesApiService from '../../services/games-api-service';
import GamesListContext from '../../contexts/GamesListContext';
import { Section } from '../../components/Utils/Utils';
import Header from './../../components/Header/Header';
import './GamesHomePage.css'
import GamesCarousel from '../../components/GameCarousel/GameCarousel';

export default class GamesHomePage extends Component {
  static contextType = GamesListContext;

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    this.context.clearError()
    GamesApiService.getGames()
      .then(res => {
        this.context.setGamesList(res)
        this.setState({ loaded: true })
      })
      .catch(this.context.setError)
  }

  renderGamesHomePage() {
    const { error } = this.context
    return <>
      <Header pathName={this.props.location.pathname} />
      <Section className='GamesListPage'>
        {error ? <p className='red'>There was an error, try again</p> : <GamesCarousel gamesList={this.context.gamesList} />}
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