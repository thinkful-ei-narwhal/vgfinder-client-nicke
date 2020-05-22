import './WishlistList.css'
import React, { Component } from 'react';
import GameItem from '../GameItem/GameItem'

export default class WishlistList extends Component {
  static defaultProps = {
    userWishlist: []
  }

  render() {
    const userWishlist = this.props.userWishlist
    return (
      userWishlist.map((game, index) => <GameItem key={index} game={game} />)
    )
  }
}