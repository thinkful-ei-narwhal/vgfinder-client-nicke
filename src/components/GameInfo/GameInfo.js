import React, { Component } from "react";
import "./GameInfo.css";
import TokenService from "./../../services/token-service";
import AddToWishlist from "../../components/AddToWishlist/AddToWishlist";
import { Button } from "./../Utils/Utils";

export default class GameInfo extends Component {
  render() {
    function myDateParse(d) {
      const date = new Date(d);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString(window.navigator.languages[0], options);
    }
    const {
      description,
      genre,
      rating,
      release_date,
      developer,
    } = this.props.game;

    return (
      <div className="game-info-container">
        <div className="game-info-text-holder game-info-holder">
          <p>{description}</p>
          <p>Genre: {genre}</p>
          <p>Rating: {rating}</p>
          <p>Release Date: {myDateParse(release_date)}</p>
          <p>Developer: {developer}</p>
          {TokenService.hasAuthToken() ? (
            <AddToWishlist game={this.props.game} />
          ) : (
            <Button disabled={true}>Sign in to add game to wishlist</Button>
          )}
        </div>
      </div>
    );
  }
}
