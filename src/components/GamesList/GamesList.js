import "./GamesList.css";
import React, { Component } from "react";
import GameItem from "../GameItem/GameItem";

export default class GamesList extends Component {
  static defaultProps = {
    gamesList: [],
  };

  render() {
    const gamesList = this.props.gamesList;
    return gamesList.map((game, index) => <GameItem key={index} game={game} />);
  }
}
