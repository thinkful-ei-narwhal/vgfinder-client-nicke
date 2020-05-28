import React, { Component } from "react";
import { Button, Input } from "../Utils/Utils";
import GamesApiService from "./../../services/games-api-service";
import GamesListContext from "../../contexts/GamesListContext";
import Alert from "./../Alert/Alert";
import "./DeleteGameForm.css";

export default class DeleteGameForm extends Component {
  state = {
    error: null,
    deleteTitle: "",
    deleteEnabled: false,
  };

  static contextType = GamesListContext;

  handleErrorClick = () => {
    this.setState({ error: null });
  };

  handleGameExistsChange = (e, gamesList) => {
    this.setState({
      deleteTitle: e.target.value,
      deleteEnabled: gamesList.find(
        (game) => game.title.toLowerCase() === e.target.value.toLowerCase()
      ),
    });
  };

  handleSubmitGameDelete = (ev, gamesList) => {
    ev.preventDefault();
    this.setState({ error: null });

    GamesApiService.deleteGame(
      gamesList.find(
        (game) =>
          game.title.toLowerCase() === this.state.deleteTitle.toLowerCase()
      ).id
    )
      .then((res) => {
        const updatedgamesList = this.context.gamesList.filter(
          (game) =>
            game.title.toLowerCase() !== this.state.deleteTitle.toLowerCase()
        );
        this.setState({
          error: `The game: ${this.state.deleteTitle} has been deleted!`,
          deleteTitle: "",
          deleteEnabled: false,
        });
        this.context.setGamesList(updatedgamesList);
      })
      .catch((err) => {
        this.setState({ error: err.message });
      });
  };

  render() {
    const { error } = this.state;
    const gamesList = this.context.gamesList;
    return (
      <form
        className="DeleteForm"
        onSubmit={(e) => this.handleSubmitGameDelete(e, gamesList)}
      >
        <div role="alert">
          {error && (
            <Alert message={error} handleErrorClick={this.handleErrorClick} />
          )}
        </div>
        <div className="title">
          <label htmlFor="DeleteGameForm_title">Title</label>
          <Input
            required
            name="title"
            id="DeleteGameForm_title"
            value={this.state.deleteTitle}
            onChange={(e) => this.handleGameExistsChange(e, gamesList)}
          ></Input>
        </div>

        <Button type="submit" disabled={!this.state.deleteEnabled}>
          Delete Game
        </Button>
      </form>
    );
  }
}
