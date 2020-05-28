import React, { Component } from "react";
import GamesApiService from "../../services/games-api-service";
import { Section } from "../../components/Utils/Utils";
import Header from "./../../components/Header/Header";
import "./GamePage.css";
import GameCarousel from "../../components/GameCarousel/GameCarousel";
import GameContext from "../../contexts/GameContext";
import GameInfo from "../../components/GameInfo/GameInfo";
import YouTube from "react-youtube";
import Alert from "./../../components/Alert/Alert";

export default class GamesHomePage extends Component {
  static contextType = GameContext;

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: null,
    };
  }

  handleErrorClick = () => {
    this.setState({ error: null });
  };

  componentDidMount() {
    const { gameId } = this.props.match.params;
    GamesApiService.getGame(gameId)
      .then((res) => {
        this.context.setGame(res);
        this.setState({ loaded: true });
      })
      .catch((err) => this.setState({ error: err.message }));
  }

  renderGame() {
    const { error } = this.state;

    const opts = {
      height: "470",
      width: "90%",
      playerVars: {
        autoplay: 0,
      },
    };

    //Running loop twice to garauntee box art is first item pushed
    const reel = [];
    for (const [key, value] of Object.entries(this.context.game)) {
      if (key === "image_url_box_art") {
        reel.push({
          imgUrl: value,
          gameId: this.context.game.id,
          title: this.context.game.title,
        });
      }
    }
    for (const [key, value] of Object.entries(this.context.game)) {
      if (key !== "image_url_box_art" && key.includes("image") && value) {
        reel.push({
          imgUrl: value,
          gameId: this.context.game.id,
          title: this.context.game.title,
        });
      }
    }

    const youtubeUrl = this.context.game.trailer_url.split("=");
    const youtubeId = youtubeUrl[1].substring(0, youtubeUrl[1].indexOf("&"));

    return (
      <>
        <Header pathName={this.props.location.pathname} />
        <Section className="GamePage">
          <div role="alert">
            {error && (
              <Alert message={error} handleErrorClick={this.handleErrorClick} />
            )}
          </div>
          <h1 className="game-name">{this.context.game.title}</h1>
          {error ? (
            <p className="red">There was an error, try again</p>
          ) : (
            <GameCarousel reel={reel} isSingleGame={true} />
          )}
          <GameInfo game={this.context.game} />
        </Section>
        <Section className="trailer-section">
          <h1>Trailer</h1>
          <YouTube videoId={youtubeId} opts={opts} onReady={this._onReady} />
        </Section>
      </>
    );
  }

  render() {
    return <>{this.state.loaded ? this.renderGame() : null}</>;
  }
}
