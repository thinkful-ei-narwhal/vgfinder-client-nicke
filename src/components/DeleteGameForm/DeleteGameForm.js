import React, { Component } from 'react';
import { Button, Input } from '../Utils/Utils';
import GamesApiService from './../../services/games-api-service'
import GamesListContext from '../../contexts/GamesListContext';
import './DeleteGameForm.css'

export default class DeleteGameForm extends Component {
  state = {
    error: null,
    deleteTitle: "",
    deleteEnabled: false
  }

  static contextType = GamesListContext;

  handleGameExistsChange = (e) => {
    this.setState({
      deleteTitle: e.target.value,
      deleteEnabled: this.gameTitles.find(gameTitle => gameTitle.toLowerCase() === e.target.value.toLowerCase())
    });
  }

  handleSubmitGameDelete = ev => {
    ev.preventDefault()
    this.setState({ error: null });

    GamesApiService.deleteGame(this.context.gamesList.find(game => game.title.toLowerCase() === this.state.deleteTitle.toLowerCase()).id)
      .then(res => {
        //Figure out what you want to do with the response
        //probably show a success and push history back to '/'
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.gameTitles = this.context.gamesList.map(game => game.title);
  }

  render() {
    const { error } = this.state
    return (
      <form className='DeleteForm' onSubmit={this.handleSubmitGameDelete}>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='title'>
          <label htmlFor='DeleteGameForm_title'>
            Title
          </label>
          <Input required name='title' id='DeleteGameForm_title' value={this.state.deleteTitle} onChange={this.handleGameExistsChange}></Input>
        </div>

        <Button type='submit' disabled={!this.state.deleteEnabled}>
          Delete Game
        </Button>
      </form>
    )
  }
}