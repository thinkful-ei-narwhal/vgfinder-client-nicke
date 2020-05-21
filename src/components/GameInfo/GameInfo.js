import React, { Component } from 'react';
import './GameInfo.css'

export default class GameInfo extends Component {
  render() {
    function myDateParse(d) {
      const date = new Date(d);
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
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