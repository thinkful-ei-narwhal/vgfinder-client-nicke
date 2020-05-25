import './SearchPage.css';
import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import { Input, Section } from './../../components/Utils/Utils';
import GamesApiService from '../../services/games-api-service';
import GamesListContext from '../../contexts/GamesListContext';
import Search from '../../components/Search/Search'

export default class SearchPage extends Component {
  static contextType = GamesListContext;

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    this.context.clearError()
    GamesApiService.getGames()
      .then(res => {
        this.context.setGamesList(res)
        this.setState({ loaded: true, games: res })
      })
      .catch(this.context.setError)
  }

  renderSearchPage() {
    return (
      <>
        <Header pathName={this.props.location.pathname} />
        <Search gamesList={this.context.gamesList} />
      </>
    );
  }

  render() {
    return (
      <>

        {this.state.loaded ? this.renderSearchPage() : null}
      </>
    )
  }

}