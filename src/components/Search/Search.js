import React, { Component } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import GamesList from "../../components/GamesList/GamesList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Section } from "./../../components/Utils/Utils";
import { Select, Option } from "./../Utils/Utils";
import "./Search.css";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: "",
      genreVal: "All",
    };
  }

  handleGenreControl = (event) => {
    this.setState({ genreVal: event.target.value });
  };

  handleSearchControl = (event) => {
    this.setState({ searchVal: event.target.value });
  };

  render() {
    //sorting and filtering logic
    let gamesList = this.props.gamesList;
    if (this.state.genreVal !== "All") {
      gamesList = gamesList.filter(
        (game) => game.genre === this.state.genreVal
      );
    }
    const lowerCaseVal = this.state.searchVal.toLowerCase();
    const sortedList = gamesList.filter((game) =>
      game.title.toLowerCase().startsWith(lowerCaseVal)
    );
    sortedList.sort(function compare(a, b) {
      return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
    });

    return (
      <>
        <Section className="search-container">
          <div className="sidebyside">
            <div className="genre">
              <label htmlFor="search_genre" className="padder genre">
                Genre
              </label>
              <Select
                required
                id="search_genre"
                name="search_genre"
                value={this.state.genreVal}
                onChange={(e) => this.handleGenreControl(e)}
              >
                <Option value="All">All</Option>
                <Option value="Action">Action</Option>
                <Option value="Adventure">Adventure</Option>
                <Option value="Simulation">Simulation</Option>
                <Option value="Strategy">Strategy</Option>
                <Option value="RPG">RPG</Option>
                <Option value="Sports">Sports</Option>
                <Option value="Horror">Horror</Option>
                <Option value="FPS">FPS</Option>
                <Option value="Third Person">Third Person</Option>
                <Option value="Point And Click">Point And Click</Option>
                <Option value="Mystery">Mystery</Option>
                <Option value="RTS">RTS</Option>
                <Option value="Puzzle">Puzzle</Option>
              </Select>
            </div>
            <div className="sidebyside-input">
              <label htmlFor="Search" className="padder">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="fontawesome-sizing"
                />
              </label>
              <Input
                name="Search"
                id="Search"
                placeholder="Search"
                value={this.state.searchVal}
                onChange={(e) => this.handleSearchControl(e)}
              ></Input>
            </div>
          </div>
        </Section>
        <Section>
          {sortedList.length > 0 ? (
            <GamesList gamesList={sortedList} />
          ) : (
            <h2>No games found</h2>
          )}
        </Section>
      </>
    );
  }
}
