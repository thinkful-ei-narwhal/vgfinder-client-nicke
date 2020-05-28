import "./AddToWishlist.css";
import React, { Component } from "react";
import UserIdContext from "../../contexts/UserIdContext";
import WishlistService from "../../services/wishlist-api-service";
import { Button } from "./../Utils/Utils";

export default class AddToWishlist extends Component {
  static contextType = UserIdContext;
  state = {
    loaded: false,
  };

  handleAddToWishlist = () => {
    const userId = this.context.userId;
    const game = this.props.game;

    WishlistService.addToWishlist(userId, game.id).then((res) => {
      const wishlist = this.context.wishlist;
      wishlist.push(res);

      const userGames = this.context.userGames;
      userGames.push(game);

      this.context.setUserIdWishlistAndGames(userId, wishlist, userGames);
    });
  };

  componentDidMount() {
    this.setState({ loaded: true });
  }

  renderButton() {
    const isInWishlist = !!this.context.wishlist.find(
      (wishlistItem) => wishlistItem.game_id === this.props.game.id
    );
    return (
      <Button
        className={`add-button ${isInWishlist ? "wishlisted-color" : ""}`}
        onClick={this.handleAddToWishlist}
        disabled={isInWishlist}
      >
        {isInWishlist ? "Wishlisted" : "Add to Wishlist"}
      </Button>
    );
  }

  render() {
    return this.state.loaded ? this.renderButton() : null;
  }
}
