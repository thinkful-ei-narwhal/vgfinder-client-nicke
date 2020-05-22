import React, { Component } from 'react';
import './GameInfo.css'

export default class GameInfo extends Component {
  render() {
    function myDateParse(d) {
      const date = new Date(d);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(window.navigator.languages[0], options);
    }
    const { description, genre, rating, release_date, developer } = this.props.game;

    return (
      <>
        <p>
          {description}
        </p>
        <p>
          Genre: {genre}
        </p>
        <p>
          Rating: {rating}
        </p>
        <p>
          Release Date: {myDateParse(release_date)}
        </p>
        <p>
          Developer: {developer}
        </p>
      </>
    )
  }
}