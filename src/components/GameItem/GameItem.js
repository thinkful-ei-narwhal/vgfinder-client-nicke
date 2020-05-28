import "./GameItem.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserIdContext from "../../contexts/UserIdContext";
import TokenService from "./../../services/token-service";
import AddToWishlist from "../AddToWishlist/AddToWishlist";
import RemoveFromWishlistButton from "../RemoveFromWishlistButton/RemoveFromWishlistButton";
import { Button } from "./../Utils/Utils";

export default class GameItem extends Component {
  static contextType = UserIdContext;

  generateWishlistButton(wishlist, game) {
    if (TokenService.hasAuthToken()) {
      return !!wishlist.find(
        (wishlistItem) => wishlistItem.game_id === game.id
      ) ? (
        <RemoveFromWishlistButton game={game} />
      ) : (
        <AddToWishlist game={game} />
      );
    } else {
      return <Button disabled={true}>Sign in to add game to wishlist</Button>;
    }
  }

  render() {
    const wishlist = this.context.wishlist;
    return (
      <div className="game-item-container">
        <div className="gameitem-display">
          <div className="game-item-img-container">
            <Link to={`/games/${this.props.game.id}`}>
              <div
                style={{
                  backgroundColor: "black",
                  backgroundImage: `url(${this.props.game.image_url_box_art})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                className={`container`}
              >
              </div>

              {/* <img
                src={this.props.game.image_url_box_art}
                className="game-item-img"
                alt={`${this.props.game.title} screenshot`}
              /> */}
            </Link>
          </div>
          <div className="text-holder">
            <p className="textbox">Title: {this.props.game.title}</p>
            <p className="textbox">Rating: {this.props.game.rating}</p>
            <p className="textbox">Genre: {this.props.game.genre}</p>
            <p className="textbox">Developer: {this.props.game.developer}</p>
            {this.generateWishlistButton(wishlist, this.props.game)}
          </div>
        </div>
      </div>
    );
  }
}
