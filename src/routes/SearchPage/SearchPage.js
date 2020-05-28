import "./SearchPage.css";
import React, { Component } from "react";
import Header from "../../components/Header/Header";
import GamesApiService from "../../services/games-api-service";
import GamesListContext from "../../contexts/GamesListContext";
import Search from "../../components/Search/Search";
import Alert from "./../../components/Alert/Alert";

export default class SearchPage extends Component {
  static contextType = GamesListContext;

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
    GamesApiService.getGames()
      .then((res) => {
        this.context.setGamesList(res);
        this.setState({ loaded: true, games: res });
      })
      .catch((err) => this.setState({ error: err.message }));
  }

  renderSearchPage() {
    const { error } = this.state;
    return (
      <>
        <div role="alert">
          {error && (
            <Alert message={error} handleErrorClick={this.handleErrorClick} />
          )}
        </div>
        <Header pathName={this.props.location.pathname} />
        <Search gamesList={this.context.gamesList} />
      </>
    );
  }

  render() {
    return <>{this.state.loaded ? this.renderSearchPage() : null}</>;
  }
}
