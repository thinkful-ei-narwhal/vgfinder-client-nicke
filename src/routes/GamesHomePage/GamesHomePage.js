import React, { Component } from "react";
import GamesApiService from "../../services/games-api-service";
import GamesListContext from "../../contexts/GamesListContext";
import { Section } from "../../components/Utils/Utils";
import Header from "./../../components/Header/Header";
import "./GamesHomePage.css";
import GameInfo from "../../components/GameInfo/GameInfo";
import GameCarousel from "../../components/GameCarousel/GameCarousel";
import Alert from "./../../components/Alert/Alert";

export default class GameHomePage extends Component {
  static contextType = GamesListContext;

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      activeGameId: 0,
      error: null,
    };
  }

  setActiveGame = (activeGameId) => {
    this.setState({ activeGameId });
  };

  componentDidMount() {
    GamesApiService.getGames()
      .then((res) => {
        this.context.setGamesList(res);
        this.setState({ loaded: true, activeGameId: res[0].id });
      })
      .catch((err) => {
        this.setState({ error: err.message });
      });
  }

  handleErrorClick = () => {
    this.setState({ error: null });
  };

  renderGamesHomePage() {
    const { error } = this.state;
    const games = this.context.gamesList.map((game) => game);
    const reel = games.map((game) => {
      return {
        imgUrl: game.image_url_box_art,
        gameId: game.id,
        title: game.title,
      };
    });
    const activeGame = games.find(
      (game) => game.id === this.state.activeGameId
    );
    return (
      <>
        <Header pathName={this.props.location.pathname} />
        <Section className="GamesListPage">
          <div role="alert">
            {error && (
              <Alert message={error} handleErrorClick={this.handleErrorClick} />
            )}
          </div>
          <h1 className="game-name">{activeGame.title}</h1>
          {error ? (
            <p className="red">There was an error, try again</p>
          ) : (
            <GameCarousel
              reel={reel}
              isSingleGame={false}
              setActiveGame={this.setActiveGame}
            />
          )}
          <GameInfo game={activeGame} />
        </Section>
      </>
    );
  }

  render() {
    return <>{this.state.loaded ? this.renderGamesHomePage() : null}</>;
  }
}
