
import './AddToWishlist.css'
import Button from '../Utils/Utils'
import React, { Component } from 'react'

export default class AddToWishlist extends Component {
  // static defaultProps = {
  //   userWishlist: [],
  //   gameId: 0
  // }

  //needs to know the user wishlist

  render() {
    return (

      <button>
        hello
        {/* {!this.props.userWishlist.find(game => game.id === this.props.gameId) ? "Add to Wishlist" : "Already Wishlisted!"} */}
      </button>

    )
  }
}
