import './RemoveFromWishlistButton.css'
import React, { Component } from 'react'

export default class RemoveFromWishlistButton extends Component {
  //needs to know the user wishlist

  render() {
    return (

      <button>
        Remove From Wishlist
        {/* {!this.props.userWishlist.find(game => game.id === this.props.gameId) ? "Add to Wishlist" : "Already Wishlisted!"} */}
      </button>

    )
  }
}