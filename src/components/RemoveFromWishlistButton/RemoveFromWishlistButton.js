import "./RemoveFromWishlistButton.css";
import React, { Component } from "react";
import UserIdContext from "../../contexts/UserIdContext";
import WishlistService from "../../services/wishlist-api-service";
import { Button } from "./../Utils/Utils";

export default class RemoveFromWishlistButton extends Component {
  //needs to know the user wishlist
  static contextType = UserIdContext;

  removeFromArray(array, arrayItemToRemove) {
    const index = array.indexOf(arrayItemToRemove);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  removeFromWishlist = () => {
    const userWishlist = this.context.wishlist;
    const userGames = this.context.userGames;
    const userId = this.context.userId;
    const game = this.props.game;
    const removeWishlistItem = userWishlist.find(
      (wishList) => wishList.game_id === this.props.game.id
    );

    WishlistService.removeFromWishlist(removeWishlistItem.id)
      .then((res) => {
        const updatedWishlist = this.removeFromArray(
          userWishlist,
          removeWishlistItem
        );
        const updatedUserGames = this.removeFromArray(userGames, game);
        this.context.setUserIdWishlistAndGames(
          userId,
          updatedWishlist,
          updatedUserGames
        );
      })
      .catch((err) => {
        this.setState({ error: err.message });
      });
  };

  render() {
    return (
      <Button className="remove-button" onClick={this.removeFromWishlist}>
        Remove From Wishlist
      </Button>
    );
  }
}
