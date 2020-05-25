import React, { Component } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import GamesList from '../../components/GamesList/GamesList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Section } from './../../components/Utils/Utils';
import './Search.css';

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchVal: '',
      genreVal: "All"
    }
  }

  handleGenreControl = (event) => {
    this.setState({ genreVal: event.target.value });
  }

  handleSearchControl = (event) => {
    this.setState({ searchVal: event.target.value });
  }

  render() {
    let gamesList = this.props.gamesList;

    if (this.state.genreVal !== "All") {
      gamesList = gamesList.filter(game => game.genre === this.state.genreVal);
    }
    const lowerCaseVal = this.state.searchVal.toLowerCase();
    const sortedList = gamesList.filter(game => game.title.toLowerCase().startsWith(lowerCaseVal));
    sortedList.sort(function compare(a, b) {
      return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
    })

    return (
      <>
        <div className='genre'>
          <label htmlFor='search_genre'>Genre</label>
          <select required id='search_genre' name='search_genre' value={this.state.genreVal} onChange={(e) => this.handleGenreControl(e)}>
            <option value="All">All</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Simulation">Simulation</option>
            <option value="Strategy">Strategy</option>
            <option value="RPG">RPG</option>
            <option value="Sports">Sports</option>
            <option value="Horror">Horror</option>
            <option value="FPS">FPS</option>
            <option value="Third Person">Third Person</option>
            <option value="Point And Click">Point And Click</option>
            <option value="Mystery">Mystery</option>
            <option value="RTS">RTS</option>
            <option value="Puzzle">Puzzle</option>
          </select>
        </div>

        <div>
          <label htmlFor='Search'>
            <FontAwesomeIcon icon={faSearch} />
          </label>
          <Input name='Search' id='Search' placeholder="Search" value={this.state.searchVal} onChange={(e) => this.handleSearchControl(e)} ></Input>
        </div>

        <Section>
          <GamesList gamesList={sortedList} />
        </Section>
      </>
    )
  }
}