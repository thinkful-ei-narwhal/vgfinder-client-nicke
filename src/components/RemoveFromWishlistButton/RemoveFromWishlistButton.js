import './RemoveFromWishlistButton.css'
import React, { Component } from 'react'
import UserIdContext from '../../contexts/UserIdContext';
import WishlistService from '../../services/wishlist-api-service'

export default class RemoveFromWishlistButton extends Component {
  //needs to know the user wishlist
  static contextType = UserIdContext;

  removeFromWishlist = () => {
    const userWishlist = this.context.wishlist;
    console.log('TESTING', userWishlist);
    const removeWishlistItem = userWishlist.find(wishList => wishList.game_id === this.props.gameId);
    console.log('TESTING', removeWishlistItem);
    console.log('TESTING', removeWishlistItem.id);

    const index = userWishlist.indexOf(removeWishlistItem);
    if (index > -1) {
      userWishlist.splice(index, 1);
    }

    WishlistService.removeFromWishlist(removeWishlistItem.id)
      .then(() => this.context.setUserWishlist(userWishlist))
      .catch(this.context.setError);
  }

  render() {



    //need to remove from wishlist
    return (
      <button onClick={this.removeFromWishlist}>
        Remove From Wishlist
        {/* {!this.props.userWishlist.find(game => game.id === this.props.gameId) ? "Add to Wishlist" : "Already Wishlisted!"} */}
      </button>

    )
  }
}