import './RemoveFromWishlistButton.css'
import React, { Component } from 'react'
import UserIdContext from '../../contexts/UserIdContext';
import WishlistService from '../../services/wishlist-api-service'

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
    const removeWishlistItem = userWishlist.find(wishList => wishList.game_id === this.props.game.id);

    WishlistService.removeFromWishlist(removeWishlistItem.id)
      .then(res => {
        const updatedWishlist = this.removeFromArray(userWishlist, removeWishlistItem);
        const updatedUserGames = this.removeFromArray(userGames, game);
        this.context.setUserIdWishlistAndGames(userId, updatedWishlist, updatedUserGames);
      })
      .catch(res => {
        this.setState({ error: res.error })
      });
  }

  render() {
    return (
      <button onClick={this.removeFromWishlist}>
        Remove From Wishlist
      </button>
    )
  }
}