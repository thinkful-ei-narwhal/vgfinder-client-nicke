import './ContributePage.css'
import React, { Component } from 'react';
import Header from './../../components/Header/Header';
import { Section } from './../../components/Utils/Utils'
import PostGameForm from './../../components/PostGameForm/PostGameForm'
import DeleteGameForm from './../../components/DeleteGameForm/DeleteGameForm'
import GamesApiService from '../../services/games-api-service';
import GamesListContext from '../../contexts/GamesListContext';

export default class ContributePage extends Component {
  static contextType = GamesListContext;

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    this.context.clearError();
    GamesApiService.getGames()
      .then(res => {
        this.context.setGamesList(res)
        this.setState({ loaded: true });
      })
      .catch(this.context.setError)
  }

  renderContribute() {
    return <>
      <Header pathName={this.props.location.pathname} />
      <Section className=''>
        <h1>Submit Indie Game</h1>
        <h3>Can't find your favorite indie title? Add your own</h3>
        <PostGameForm />
      </Section>
      <Section className=''>
        <h1>Delete Indie Game</h1>
        <h3>Don't think a games is indie enough to be on this site? Delete it.</h3>
        <DeleteGameForm />
      </Section>
    </>
  }

  render() {
    return (
      <>
        {this.state.loaded ? this.renderContribute() : null}
      </>
    )
  }
}