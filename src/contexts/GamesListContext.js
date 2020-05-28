import React, { Component } from "react";

const GamesListContext = React.createContext({
  gamesList: [],
  setGamesList: () => {},
});
export default GamesListContext;

export class GamesListProvider extends Component {
  state = {
    gamesList: [],
  };

  setGamesList = (gamesList) => {
    this.setState({ gamesList });
  };

  render() {
    const value = {
      gamesList: this.state.gamesList,
      setGamesList: this.setGamesList,
    };
    return (
      <GamesListContext.Provider value={value}>
        {this.props.children}
      </GamesListContext.Provider>
    );
  }
}
