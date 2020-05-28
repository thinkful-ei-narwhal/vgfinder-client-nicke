import React, { Component } from "react";

export const nullGame = {
  id: "",
  title: "",
  description: "",
  genre: "",
  rating: "",
  release_date: "",
  developer: "",
  trailer_url: "",
  image_url_box_art: "",
  image_url_two: "",
  image_url_three: "",
  image_url_four: "",
  image_url_five: "",
};

const GameContext = React.createContext({
  game: nullGame,
  setGame: () => {},
  clearGame: () => {},
});

export default GameContext;

export class GameProvider extends Component {
  state = {
    game: nullGame,
  };

  setGame = (game) => {
    this.setState({ game });
  };

  clearGame = () => {
    this.setGame(nullGame);
  };

  render() {
    const value = {
      game: this.state.game,
      setGame: this.setGame,
      clearGame: this.clearGame,
    };
    return (
      <GameContext.Provider value={value}>
        {this.props.children}
      </GameContext.Provider>
    );
  }
}
