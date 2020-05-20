import React, { Component } from 'react';

const GamesListContext = React.createContext({
  gamesList: [],
  error: null,
  setError: () => { },
  clearError: () => { },
  setGamesList: () => { },
})
export default GamesListContext

export class GamesListProvider extends Component {
  state = {
    gamesList: [],
    error: null,
  };

  setGamesList = gamesList => {
    this.setState({ gamesList })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    const value = {
      gamesList: this.state.gamesList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setGamesList: this.setGamesList,
    }
    return (
      <GamesListContext.Provider value={value}>
        {this.props.children}
      </GamesListContext.Provider>
    )
  }
}
